export const State = ({ word }) => {
  const studyState = () => {
    switch (word.state) {
      case 0:
        return {
          content: "未着手",
          class: "badge bg-secondary-subtle border border-secondary",
        };
      case 1:
        return {
          content: "学習中",
          class: "badge bg-warning-subtle border border-warning",
        };
      case 2:
        return {
          content: "学習済み",
          class: "badge bg-success-subtle border border-success",
        };
    }
  };
  const state = studyState();
  return (
    <>
      <span className={state ? state.class : ""}>
        {state ? state.content : ""}
      </span>
    </>
  );
};
