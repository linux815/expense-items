<template>
    <card :title="$t('expenses')">
        <Button type="primary" dashed icon="md-add" :to="{ name: 'expense.createExpense' }">
            {{ this.$t('add') }}
        </Button>
        <Divider />

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
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: this.$t('name'),
                        key: 'name',
                        sortable: true,
                    },
                    {
                        title: this.$t('category'),
                        key: 'category',
                        sortable: true,
                    },
                    {
                        title: this.$t('comment'),
                        key: 'comment'
                    },
                    {
                        title: this.$t('cost'),
                        key: 'cost',
                        sortable: true,
                    },

                    {
                        title: this.$t('action'),
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        ghost: true,
                                        icon: 'md-create'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({path: `/expenses/${params.row.id}/update`})
                                        }
                                    }
                                }),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        ghost: true,
                                        icon: 'md-close'
                                    },
                                    on: {
                                        click: () => {
                                            let expenseId = params.row.id;
                                            let index = params.index;
                                            this.remove(expenseId, index);
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        created() {
            this.fetchExpenses();
        },
        methods: {
            async remove(expenseId, index) {
                try {
                    let response = await this.$store.dispatch('expense/deleteExpense', {id: expenseId});
                    if (response.data.status === 'success') {
                        this.data.splice(index, 1);
                        this.$Message.info(response.data.message);
                    } else {
                        this.$Notice.error({
                            title: this.$t('error_deleting'),
                            desc: response.data.message
                        });
                    }
                } catch (e) {
                    console.warn(e);
                }
            },
            async fetchExpenses() {
                let data = await this.$store.dispatch('expense/fetchExpenses');

                this.data = data.map((expense) => {
                    return {
                        name: expense.name,
                        id: expense.id,
                        comment: expense.comment,
                        cost: expense.cost,
                        category: expense.category.name
                    }
                });
            },
        }
    }
</script>
