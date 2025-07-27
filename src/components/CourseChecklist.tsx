interface CourseChecklistProps {
  checklist?: Array<any>;
}

const CourseChecklist: React.FC<CourseChecklistProps> = ({
  checklist = [],
}) => {
  if (!checklist || checklist.length === 0) {
    return <div>No checklist available</div>;
  }

  return (
    <div>
      <h2>Course Checklist</h2>
      <ul>
        {checklist.map((item, index) => (
          <li key={index}>
            <span>{item?.text}</span>
            {/* Add any other properties you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseChecklist;
