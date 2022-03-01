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
        value: "not-completed",
        text: "Not completed",
      },
      {
        value: "important",
        text: "Important",
      },
      {
        value: "urgent",
        text: "Urgent",
      },
      {
        value: "not-a-priority",
        text: "Not a priority",
      },
      {
        value: "default",
        text: "Other",
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
