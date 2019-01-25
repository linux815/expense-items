<template>
    <card :title="$t('analysis_expenses')">
        <DatePicker v-model="expensed_at"
                    type="daterange"
                    confirm
                    transfer
                    format="dd.MM.yyyy"
                    split-panels
                    @on-ok="fetchExpenses"
                    :placeholder="$t('placeholder_expense_start_at')"
                    style="width: 200px"></DatePicker>
        <Divider/>

        <Table border :columns="columns" :data="data" :no-data-text="this.$t('no_data')"></Table>
    </card>
</template>

<script>
    export default {
        metaInfo() {
            return {title: this.$t('expenses')}
        },
        data() {
            return {
                expensed_at: ['2019-01-01', '2019-03-01'],
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: this.$t('category'),
                        key: 'category',
                        sortable: true,
                    },
                    {
                        title: this.$t('cost'),
                        key: 'cost',
                        sortable: true,
                    },
                ],
                data: []
            }
        },
        created() {
            this.fetchExpenses();
        },
        methods: {
            async fetchExpenses() {
                let data = await this.$store.dispatch('expense/fetchAnalysisExpenses', {
                    dateRange: this.expensed_at,
                });

                this.data = data.map((expense) => {
                    return {
                        cost: expense.sum,
                        category: expense.category.name,
                    }
                });
            },
        }
    }
</script>
