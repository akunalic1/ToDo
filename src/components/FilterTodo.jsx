import React from "react";

const FilterTodo = ({ handleFilterOption }) => {
  const renderFilterOptions = () => {
    const filters = [
      {
        value: "all",
        text: "All",
      },
      {
        value: "completed",
        text: "Completed",
      },
      {
        value: "important",
        text: "Important",
      },
      {
        value: "Urgent",
        text: "urgent",
      },
      {
        value: "not-a-priority",
        text: "Not a priority",
      },
      {
        value: "Other",
        text: "default",
      },
    ];

    return (
      <>
        {filters.map((filter) => {
          return (
            <button
              key={filter.value}
              value={filter.value}
              onClick={handleFilterOption}
              className="option glass"
            >
              {filter.text}
            </button>
          );
        })}
      </>
    );
  };
  return <>{renderFilterOptions()}</>;
};

export default FilterTodo;
