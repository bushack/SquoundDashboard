
import { React } from "react"
import { table, tableHeader, tableRow, untabbedCard } from "@/styles/ui";


type Column<T> = {
    key: string;
    header: string;
    accessor: (item: T) => React.ReactNode;
    className?: string;
};


type Properties<T> = {
    data: T[];
    loading: boolean;
    columns: Column<T>[];
    getRowKey: (item: T) => string | number;
    onRowClick?: (item: T) => void;
};


export default function GenericTable({
    data,
    loading,
    columns,
    getRowKey,
    onRowClick,
}: Properties) {
    
    return (

        <div style={untabbedCard}>

            <div style={{margin: "5px 2px", fontSize: "10pt"}}>
                { loading && <p>Loading...</p>}
                { !loading && data.length === 0 && <p>No results</p> }
                { !loading && data.length > 0 && <p>{data.length} result(s)</p> }
            </div>
            
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
                    {data.map((item) => (
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
        </div>
    );
}