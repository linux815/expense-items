<template>
    <div>
        <card :title="(this.$route.name === 'category.createCategory') ? this.$t('add_category') : this.$t('update_category')">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">

            <FormItem prop="name" :label="this.$t('name')"
                      :error="formItem.errors.get('name')">
                <Input v-model="formItem.name" :placeholder="this.$t('name')"></Input>
            </FormItem>

            <FormItem style="margin-top: 30px">
                <Button v-if="this.$route.name === 'category.createCategory'"
                        @click.native="handleSubmit('formItem')"
                        type="primary">
                    <span v-if="!createLoading">{{ this.$t('create') }}</span>
                    <span v-else>{{ this.$t('creating') }}</span>
                </Button>
                <Button v-if="this.$route.name === 'category.update'"
                        @click.native="handleUpdate('formItem')"
                        type="primary">
                    <span v-if="!createLoading">{{ this.$t('update') }}</span>
                    <span v-else>{{ this.$t('updating') }}</span>
                </Button>
                <Button @click.native="handleReset('formItem')" style="margin-left: 8px">
                    {{ this.$t('clear') }}
                </Button>
                <Button :to="{ name: 'categories' }" style="margin-left: 8px">
                    {{ this.$t('cancel') }}
                </Button>
            </FormItem>
        </Form>
        </card>
    </div>
</template>

<script>
    import Form from 'vform';

    export default {
        metaInfo() {
            return {title: (this.$route.name === 'category.createCategory') ? this.$t('add_category') : this.$t('update_category')}
        },
        data() {
            return {
                createLoading: false,
                formItem: new Form({
                    name: '',
                }),
                ruleValidate: {
                    name: [
                        {
                            type: 'string', required: true, message: this.$t('validate_name'), trigger: 'blur'
                        }
                    ],
                },
            }
        },
        created() {
            this.fetchUpdateData();
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        let response;
                        try {
                            response = await this.formItem.post('/api/categories');
                        } catch (e) {
                            this.createLoading = false;
                        }
                        if (response.data.success === true) {
                            this.$router.push('/categories');
                            this.$Message.success(this.$t('validate_msg_success'));
                        }
                    } else {
                        this.$Message.error(this.$t('validate_msg_fail'));
                    }
                })
            },
            handleUpdate(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        this.createLoading = true;
                        try {
                            await this.formItem.put(`/api/categories/` + this.$route.params.id);
                            this.$router.push('/categories');
                            this.$Message.success(this.$t('validate_msg_success'));
                        } catch (e) {
                            this.createLoading = false;
                        }
                    } else {
                        this.$Message.error(this.$t('validate_msg_fail'));
                    }
                })
            },
            async fetchUpdateData() {
                if (this.$route.name !== 'category.update') return;

                let response = await this.$store.dispatch('category/fetchCategoryUpdateData', {id: this.$route.params.id});

                if (response.data.status === 'error') {
                    this.$Notice.error({
                        title: this.$t('error_updating'),
                        desc: response.data.message
                    });
                    this.$router.push('/categories');
                }

                this.formItem.fill(response.data);
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
        }
    }
</script>

<style>

</style>
