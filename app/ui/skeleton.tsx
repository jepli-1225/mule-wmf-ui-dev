export function TableRowSkeleton() {
  return (
    <tr className="shimmer-container">
      <td className="whitespace-nowrap py-2 pl-2">
        <div className="flex items-center">
          <div className="h-7 w-28 rounded bg-[#cbd5e1]"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-2 py-2">
        <div className="flex items-center">
          <div className="h-7 w-32 rounded bg-[#cbd5e1]"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-2 py-2">
        <div className="flex items-center">
          <div className="h-7 w-16 rounded bg-[#cbd5e1]"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-2 py-2">
        <div className="flex items-center">
          <div className="h-7 w-16 rounded bg-[#cbd5e1]"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-2 py-2">
        <div className="flex items-center">
          <div className="h-7 w-16 rounded bg-[#cbd5e1]"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-2 py-2">
        <div className="flex items-center">
          <div className="h-7 w-16 rounded bg-[#cbd5e1]"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-2 py-2">
        <div className="flex items-center">
          <div className="h-7 w-28 rounded bg-[#cbd5e1]"></div>
        </div>
      </td>
      <td className="whitespace-nowrap py-2 pl-2">
        <div className="flex justify-center items-center gap-3">
          <div className="h-7 w-16 rounded  bg-[#cbd5e1]"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export const TableSkeleton = () => {
  return (
    <div className="mt-4 min-w-full flex">
      <table>
        <tbody>
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>
    </div>
  );
};

export function Searchbar() {
  return (
    <div className="flex w-full shimmer-container px-2 pb-2">
      <div className="whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-7 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
      </div>
      <div className="whitespace-nowrap">
        <div className="flex items-center pl-2">
          <div className="h-7 w-22 rounded bg-[#cbd5e1]"></div>
        </div>
      </div>
      <div className="whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-7 w-16 rounded bg-[#cbd5e1]"></div>
        </div>
      </div>
      <div className="whitespace-nowrap pl-2">
        <div className="flex items-center">
          <div className="h-7 w-16 rounded bg-[#cbd5e1]"></div>
        </div>
      </div>
      <div className="whitespace-nowrap pl-12">
        <div className="flex items-center">
          <div className="h-7 w-24 rounded bg-[#cbd5e1]"></div>
        </div>
      </div>
      <div className="whitespace-nowrap pl-24">
        <div className="flex items-center gap-24">
          <div className="h-7 w-44 rounded bg-[#cbd5e1]"></div>
          <div className="h-7 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
      </div>
    </div>
  );
}

export const Searchbars = () => {
  return (
    <div className="min-w-full align-middle">
      <div className="rounded-lg bg-white md:pt-0">
        <div className="overflow-hidden">
          <Searchbar />
        </div>
      </div>
    </div>
  );
};

export const Pagination = ({ currentPage = 1, totalPages = 5 }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    let totalButtonsToShow = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + totalButtonsToShow - 1);

    if (endPage - startPage + 1 < totalButtonsToShow) {
      startPage = Math.max(1, endPage - totalButtonsToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="min-w-full align-middle flex justify-end items-center pt-4">
      <div className="flex items-center gap-2">
        {currentPage != 1 && (
          <div className="h-8 w-20 rounded bg-[#cbd5e1]"></div>
        )}
        {currentPage > 3 && (
          <div className="h-8 w-8 rounded bg-[#cbd5e1]"></div>
        )}
        {currentPage != 1 &&
          getPageNumbers().map((pageNumber) => (
            <div
              key={pageNumber}
              className={`h-8 w-8 rounded ${
                pageNumber === currentPage ? "bg-yellow-200" : "bg-[#cbd5e1]"
              }`}
            ></div>
          ))}
        {currentPage != 1 && currentPage < totalPages - 2 && (
          <div className="h-8 w-8 rounded bg-[#cbd5e1]"></div>
        )}
        {totalPages != 1 && (
          <div className="h-8 w-20 rounded bg-[#cbd5e1]"></div>
        )}
      </div>
    </div>
  );
};

export function DetailPage() {
  return (
    <div className="flex w-full shimmer-container pl-6 pt-6">
      <div className="whitespace-nowrap">
        <div className="flex items-center gap-16 pb-1">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-16 pb-1">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-16 pb-1">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-16 pb-1">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-16 pb-1">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-16 pb-1">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-16 pb-1">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-16 pb-1">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-16 pb-4">
          <div className="h-6 w-24 rounded bg-[#cbd5e1]"></div>
          <div className="h-6 w-44 rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center gap-6 pb-6 pl-40">
          <div className="h-8 w-16 rounded bg-yellow-300"></div>
          <div className="h-8 w-16 rounded bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}

export function CreateButton() {
  return (
    <div className="shimmer-container px-4 py-1">
      <div className="flex items-center gap-16">
        <div className="h-7 w-36 rounded bg-yellow-300"></div>
      </div>
    </div>
  );
}

export function ReportsDomain() {
  return (
    <div className="shimmer-container px-4 py-1">
      <div className="flex items-center gap-16">
        <div className="h-7 w-24 rounded bg-[#cbd5e1]"></div>
      </div>
    </div>
  );
}

export const BarGraphSkeleton = () => {
  const barHeights = [60, 40, 80, 30, 50, 70, 45, 65];

  return (
    <div className="w-3/4 h-72 bg-transparent shimmer-container rounded-lg shadow-sm p-4 mt-4">
      <div className="w-full h-full relative">
        <div className="absolute top-0 left-0 right-0 flex justify-center pb-2">
          <div className="h-7 w-36 rounded opacity-80 bg-[#cbd5e1]"></div>
        </div>
        <div className="w-full h-full pt-10">
          <div className="absolute inset-y-10 left-0 right-4 flex flex-col justify-between">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-full h-px bg-[#cbd5e1]"></div>
            ))}
          </div>
          <div className="absolute bottom-0 left-8 right-8 h-[calc(100%-40px)] flex items-end justify-between">
            {barHeights.map((height, index) => (
              <div
                key={index}
                className="w-14 bg-[#e68a00] opacity-80 rounded-t-sm"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-4 h-px bg-[#cbd5e1]"></div>
        </div>
      </div>
    </div>
  );
};

import React from "react";

interface PieChartSkeletonProps {
  size?: number;
  colors?: string[];
}

export const PieChartSkeleton: React.FC<PieChartSkeletonProps> = ({
  size = 100,
  colors = ["#e83e26", "#00a8c4", "#e68a00", "#f3da61", "#88b23a", "#a5d38e"],
}) => {
  const center = size / 2;
  const radius = size / 2;

  const createSector = (
    startAngle: number,
    endAngle: number,
    color: string
  ) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      center,
      center,
      "Z",
    ].join(" ");

    return <path d={d} fill={color} />;
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const sectors = colors.map((color, index) => {
    const startAngle = (index / colors.length) * 360;
    const endAngle = ((index + 1) / colors.length) * 360;
    return createSector(startAngle, endAngle, color);
  });

  return (
    <div className="relative pl-4" style={{ width: size, height: size + 40 }}>
      <div className="flex ">
        <div className=" flex items-center z-10">
          <div className="h-7 w-28 shimmer-container rounded bg-[#cbd5e1]"></div>
        </div>
        <div className="flex items-center pl-2 z-10">
          <div className="h-7 w-16 shimmer-container rounded bg-[#cbd5e1]"></div>
        </div>
      </div>
      <div className="pt-4 pl-12">
        <div className="absolute" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            {sectors}
          </svg>
          <div
            className="absolute inset-0 rounded-full animate-pulse bg-gray-200 opacity-30"
            style={{ animationDuration: "2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
