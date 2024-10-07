"use client";

import { useCallback, useEffect, useState } from "react";
import BarGraph from "@/app/ui/reports/barGraph";
import PieChart from "@/app/ui/reports/pieChart";
import { Chart, ChartData, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { BarElement, CategoryScale, LinearScale } from "chart.js";
import { Domains } from "../lib/definitions";
import DomainDropdown from "../ui/reports/domainDropdown";
import ReportsPageLayout from "../ui/ReportsPageLayout";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import PieDateSearch from "../ui/reports/pieDateSearch";

Chart.register(ChartDataLabels, CategoryScale, LinearScale, BarElement);

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [inboundStats, setInboundStats] = useState<any[]>([]);
  const [inboundSource, setInboundSource] = useState<any[]>([]);
  const [allSourceSystems, setAllSourceSystems] = useState<any[]>([]);
  const [domains, setDomains] = useState<Domains[]>([]);
  const [, setSelectedDomain] = useState("");
  const [sourceSystemColorMap, setSourceSystemColorMap] = useState<
    Map<string, string>
  >(new Map());
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [pieDate, setPieDate] = useState<Date>(new Date());

  const handleDateRangeSearch = useCallback(
    (start: Date | null, end: Date | null) => {
      if (start && end) {
        setStartDate(
          new Date(start.toISOString().split("T")[0] + "T00:00:00.000Z")
        );
        setEndDate(
          new Date(end.toISOString().split("T")[0] + "T23:59:59.999Z")
        );
        fetchInboundStats("", start.toISOString(), end.toISOString(), "");
      }
    },
    []
  );

  const handlePieDateSearch = useCallback((date: Date | null) => {
    if (date) {
      const adjustedDate = new Date(
        date.toISOString().split("T")[0] + "T23:59:59.999Z"
      );
      setPieDate(adjustedDate);
      fetchInboundStats("", "", "", adjustedDate.toISOString());
    }
  }, []);

  const handleDomainChange = useCallback((domain: string) => {
    setSelectedDomain(domain);
    fetchInboundStats(domain);
  }, []);

  const fetchInboundStats = useCallback(
    async (
      domain: string = "",
      start?: string,
      end?: string,
      date?: string
    ) => {
      setIsLoading(true);
      try {
        const startDates =
          start || startDate.toISOString().split("T")[0] + "T00:00:00.000Z";
        const endDates =
          end || endDate.toISOString().split("T")[0] + "T23:59:59.999Z";
        const pieDates =
          date || pieDate.toISOString().split("T")[0] + "T23:59:59.999Z";
        const response = await fetch(
          `/api/reports?domainId=${domain}&startDate=${startDates}&endDate=${endDates}&pieEndDate=${pieDates}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch inbound stats");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setInboundStats(data.barData);
        setInboundSource(data.pieData);
        setAllSourceSystems(data.allSourceSystems);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [startDate, endDate]
  );

  useEffect(() => {
    fetchInboundStats();
  }, [fetchInboundStats]);

  useEffect(() => {
    const fetchInboundStats = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) {
          throw new Error("Failed to fetch inbound stats");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setInboundStats(data.barData);
        setInboundSource(data.pieData);
        setAllSourceSystems(data.allSourceSystems);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInboundStats();
  }, []);

  const fetchDomains = useCallback(async () => {
    try {
      const res = await fetch("/api/configurations/domains");
      if (!res.ok) throw new Error("Failed to fetch domains");
      const data = await res.json();
      setDomains(data.data);
    } catch (error) {
      console.error("Error fetching inbound events:", error);
    }
  }, []);

  function prepareChartData(
    inboundStats: any[]
  ): ChartData<"bar", number[], unknown> {
    const colorOrder = [
      "#e83e26",
      "#00a8c4",
      "#e68a00",
      "#f3da61",
      "#88b23a",
      "#a5d38e",
      "#808080",
    ];

    const dateSet = new Set(
      inboundStats.map((stat) => `${stat[""][1]}-${stat[""][2]}-${stat[""][3]}`)
    );

    const statusSet = new Set(inboundStats.map((stat) => stat.Status));

    const dates = Array.from(dateSet).sort();
    const statuses = Array.from(statusSet);

    const datasets = statuses.map((status, index) => {
      const baseColor = colorOrder[index % colorOrder.length];
      return {
        label: status,
        data: dates.map((date) => {
          const stat = inboundStats.find(
            (s) =>
              `${s[""][1]}-${s[""][2]}-${s[""][3]}` === date &&
              s.Status === status
          );
          return stat ? stat[""][0] : 0;
        }),
        backgroundColor: baseColor,
        hoverBackgroundColor: lightenColor(baseColor, 12),
        barPercentage: 0.7,
      };
    });

    return {
      labels: dates.map((date) => {
        const [year, month, day] = date.split("-");
        return `${day} ${getMonthName(parseInt(month))}`;
      }),
      datasets,
    };
  }

  function lightenColor(hex: string, percent: number): string {
    const parsedHex = parseInt(hex.slice(1), 16);
    const red = (parsedHex >> 16) + Math.round(2.55 * percent);
    const green = ((parsedHex >> 8) & 0x00ff) + Math.round(2.55 * percent);
    const blue = (parsedHex & 0x0000ff) + Math.round(2.55 * percent);

    const clampedRed = Math.min(red, 255);
    const clampedGreen = Math.min(green, 255);
    const clampedBlue = Math.min(blue, 255);

    const lightenedHex =
      "#" +
      ((1 << 24) + (clampedRed << 16) + (clampedGreen << 8) + clampedBlue)
        .toString(16)
        .slice(1);

    return lightenedHex;
  }

  useEffect(() => {
    if (allSourceSystems.length > 0) {
      const colorMap = assignColorsToSourceSystems(
        allSourceSystems.map((item) => item.SOURCESYSTEM)
      );
      setSourceSystemColorMap(colorMap);
    }
  }, [allSourceSystems]);

  function assignColorsToSourceSystems(
    sourceSystems: string[]
  ): Map<string, string> {
    const colorPalette = [
      "#e83e26",
      "#00a8c4",
      "#e68a00",
      "#f3da61",
      "#88b23a",
      "#a5d38e",
      "#cc1439",
      "#e68c7c",
      "#976bb3",
      "#ccb8cc",
    ];

    const colorMap = new Map<string, string>();
    sourceSystems.sort().forEach((system, index) => {
      colorMap.set(system, colorPalette[index % colorPalette.length]);
    });

    return colorMap;
  }

  function preparePieChartData(
    inboundSource: any[],
    _allSourceSystems: string[],
    colorMap: Map<string, string>
  ): ChartData<"pie"> {
    const labels = inboundSource.map((item) => item.SOURCESYSTEM);
    const data = inboundSource.map((item) => item[""]);
    const backgroundColors = labels.map(
      (label) => colorMap.get(label) || "#000000"
    );

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors.map((color) =>
            lightenColor(color, 10)
          ),
          borderWidth: 0,
          hoverBorderWidth: 0,
        },
      ],
    };
  }

  const SourceSystemLegend: React.FC<{ colorMap: Map<string, string> }> = ({
    colorMap,
  }) => {
    const itemsPerPage = 18;
    const items = Array.from(colorMap);
    const [currentPage, setCurrentPage] = useState(0);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    const paginatedItems = items.slice(startIndex, endIndex);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const LegendItem: React.FC<{ system: string; color: string }> = ({
      system,
      color,
    }) => (
      <div className="legend-item">
        <span className="color-box" style={{ backgroundColor: color }}></span>
        <span className="system-name">{system}</span>
      </div>
    );

    const handlePrevPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (endIndex < items.length) {
        setCurrentPage(currentPage + 1);
      }
    };

    return (
      <div className="pl-16">
        <div className="legend-container">
          {paginatedItems.map(([system, color]) => (
            <LegendItem key={system} system={system} color={color} />
          ))}
        </div>
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={currentPage === 0}>
            <ChevronUpIcon
              className={`w-5 h-5 ${
                currentPage === 0 ? "text-[#cccccc]" : "text-[#003399]"
              }`}
            />
          </button>
          <span className="text-xs justify-between">
            {currentPage + 1}/{totalPages}
          </span>
          <button onClick={handleNextPage} disabled={endIndex >= items.length}>
            <ChevronDownIcon
              className={`w-5 h-5 ${
                currentPage === totalPages - 1
                  ? "text-[#cccccc]"
                  : "text-[#003399]"
              }`}
            />
          </button>
        </div>
      </div>
    );
  };

  function getMonthName(month: number): string {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month - 1];
  }

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 15,
          color: "#000000",
          textAlign: "center",
          font: {
            lineHeight: 1.5,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Daily Inbound Stats",
        color: "#000000",
        font: {
          weight: "normal",
          size: 16,
        },
      },
      // @ts-ignore
      datalabels: {
        color: "#ffffff",
        anchor: "center",
        align: "center",
        formatter: (value: number) => {
          if (value > 0) {
            return value.toString();
          } else {
            return "";
          }
        },
        font: {
          weight: "bold",
          size: 12,
        },
        // @ts-ignore
        textStrokeColor: "rgba(0,0,0,1)",
        // @ts-ignore
        textStrokeWidth: 1.8,
        // @ts-ignore
        textShadowBlur: [2, 2],
        // @ts-ignore
        textShadowColor: ["rgba(0,0,0,1)", "rgba(0,0,0,1)"],
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Daily Statistics",
          color: "#000000",
        },
        ticks: {
          callback: function (value, index) {
            return this.getLabelForValue(value as number);
            // index % 2 === 0
            //   ? this.getLabelForValue(value as number)
            //   : "";
          },
          maxRotation: 45,
          minRotation: 45,
          align: "start",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
        title: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 10,
          stepSize: 500,
          callback: function (value) {
            return value;
          },
        },
        grid: {
          display: true,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            // const total = context.dataset.data.reduce(
            //   (acc, current) => acc + current,
            //   0
            // );
            // const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value}`;
          },
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  useEffect(() => {
    const loadDomains = async () => {
      await fetchDomains();
    };
    loadDomains();
  }, [fetchDomains]);

  const chartData = prepareChartData(inboundStats);
  const pieChartData = preparePieChartData(
    inboundSource,
    allSourceSystems,
    sourceSystemColorMap
  );

  const barGraph = <BarGraph data={chartData} options={chartOptions} />;
  const pieChart = <PieChart data={pieChartData} options={pieChartOptions} />;
  const pieChartWithDateSearch = (
    <PieDateSearch
      onSearch={handlePieDateSearch}
      dateSearch={pieDate.toISOString().split("T")[0]}
    />
  );

  const headerDropdown = (
    <DomainDropdown domains={domains} onChange={handleDomainChange} />
  );

  return (
    <ReportsPageLayout
      header="Dashboard"
      isLoading={isLoading}
      pieChart={
        <>
          {pieChartWithDateSearch}
          {pieChart}
          <div className="pt-4">
            <SourceSystemLegend colorMap={sourceSystemColorMap} />
          </div>
        </>
      }
      barGraph={barGraph}
      headerDomain={headerDropdown}
      onDateRangeSearch={handleDateRangeSearch}
      initialStartDate={startDate.toISOString().split("T")[0]}
      initialEndDate={endDate.toISOString().split("T")[0]}
    />
  );
}
