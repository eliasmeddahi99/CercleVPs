export function Tooltip({ children, content }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute hidden group-hover:block bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-dark-300 text-gray-200 text-sm py-1 px-2 rounded whitespace-nowrap z-50">
        {content}
      </div>
    </div>
  );
}