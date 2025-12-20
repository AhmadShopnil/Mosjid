export const TableSkeleton = () => (
  <tbody>
    {Array.from({ length: 3 }).map((_, row) => (
      <tr key={row}>
        {Array.from({ length: 6 }).map((_, col) => (
          <td key={col} className="border border-[#B0C4B8] py-3 text-center">
            <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded animate-pulse" />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);