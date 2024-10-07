export interface SearchProps {
  onSearch: (queries: Record<string, string>) => void;
  placeholder?: string;
  fields: Array<{
    key: string;
    placeholder: string;
    type: "text" | "select";
    options?: Array<{ value: string; label: string }>;
  }>;
  showDatePicker?: boolean;
  showAdvancedSearch?: boolean;
  initialStartDate?: string;
  initialEndDate?: string;
}
