
import { React } from "react"
import { table, tableHeader, tableRow, textStyle } from "@/styles/ui";


type Column<T> = {
    key: string;
    header: string;
    accessor: (item: T) => React.ReactNode;
    className?: string;
};


type Properties<T> = {
    data: T[];
    loading: boolean;
    hidden: boolean;
    columns: Column<T>[];
    getRowKey: (item: T) => string | number;
    onRowClick?: (item: T) => void;
};


export default function GenericTable({
    data,
    loading,
    hidden,
    columns,
    getRowKey,
    onRowClick,
}: Properties) {
    
    return (

        <div style={{...textStyle, margin: "5px 2px"}}>
            
            {/* Display loading message while awaiting data */}
            {loading && <div>Loading...</div>}

            {/* Display table only if data is not null/empty */}
            {!loading && data?.length > 0 && (
            <div hidden={hidden}>
                <p style={{margin: "3px 1px"}}>{data.length} result(s)</p>
                <table style={table}>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    style={tableHeader}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((item) => (
                            <tr
                                key={getRowKey(item)}
                                className={onRowClick ? "hover:bg-gray-100" : ""}
                                onClick={() => onRowClick?.(item)}
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className={col.className} style={tableRow}>{col.accessor(item)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>)}
            
            {/* No results message */}
            {!loading && !data && (<p hidden={hidden}>No results</p>)}
        </div>
    );
}