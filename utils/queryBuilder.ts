
type Condition = string;

type AndCondition = {
    column: string;     // eg. "min_price"
    operator: string;   // eg. "eq", "gte", "lte"
    value: any;
}


export class QueryBuilder {

    private andConditions: AndCondition[] = [];
    private groupedConditions: Condition[] = [];

    addAnd(column: string, operator: string, value: any) {
        this.andConditions.push({column, operator, value});
        return this;
    }

    addGroup(condition: Condition) {
        this.groupedConditions.push(condition);
        return this;
    }

    apply(query: any) {

        // Apply AND conditions normally.
        this.andConditions.forEach(({column, operator, value}) => {
            query = query.filter(column, operator, value);
        });

        this.groupedConditions.forEach((condition) => {
            query = query.or(condition);
        });

        return query;
    }
}