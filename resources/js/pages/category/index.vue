<template>
    <card :title="$t('categories')">
        <Button type="primary" dashed icon="md-add" :to="{ name: 'category.createCategory' }">
            {{ this.$t('add') }}
        </Button>
        <Divider />

        <Table border :columns="columns" :data="data" :no-data-text="this.$t('no_data')"></Table>
    </card>
</template>

<script>
    export default {
        metaInfo() {
            return {title: this.$t('categories')}
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
                    },
                    {
                        title: this.$t('type'),
                        key: 'type'
                    },
                    {
                        title: 'Action',
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
                                            this.$router.push({path: `/categories/${params.row.id}/update`})
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
                                            let categoryId = params.row.id;
                                            let index = params.index;
                                            this.remove(categoryId, index);
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
            this.fetchCategories();
        },
        methods: {
            async remove(categoryId, index) {
                try {
                    let response = await this.$store.dispatch('category/deleteCategory', {id: categoryId});
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
            async fetchCategories() {
                let data = await this.$store.dispatch('category/fetchCategories');

                this.data = data.map((category) => {
                    return {
                        name: category.name,
                        id: category.id,
                        type: this.$t(category.type),
                    }
                });
            },
        }
    }
</script>
