import { useState } from "react";
import { results } from "../../utils/mockData";
import DetailPanel from "../DetailPanel/DetailPanel";
import ResultCard from "../ResultCard/ResultCard";

function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  const filteredResults = results.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
}

export default Main;
