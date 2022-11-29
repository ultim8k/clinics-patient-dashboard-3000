import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { SortDirection } from "../../types";

export const SortIcon = ({ sortDirection }: { sortDirection: SortDirection }) =>
  sortDirection === "ascending" ? <ChevronDownIcon /> : <ChevronUpIcon />;
