
type Condition = string;

type AndCondition = {
    column: string;     // eg. "min_price"
    operator: string;   // eg. "eq", "gte", "lte"
    value: any;
}


export class QueryBuilder {

    private andConditions: AndCondition[] = [];
    private orConditions: Condition[] = [];

    addAnd(column: string, operator: string, value: any) {
        this.andConditions.push({column, operator, value});
        return this;
    }

    addOr(condition: Condition) {
        this.orConditions.push(condition);
        return this;
    }

    apply(query: any) {

        // Apply AND conditions normally.
        this.andConditions.forEach(({column, operator, value}) => {
            query = query.filter(column, operator, value);
        });

        // Apply OR conditions as a single grouped clause.
        if (this.orConditions.length > 0) {
            query = query.or(this.orConditions.join(","));
        }

        return query;
    }
}