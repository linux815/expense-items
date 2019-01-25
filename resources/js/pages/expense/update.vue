<template>
    <div>
        <card
            :title="(this.$route.name === 'expense.createExpense') ? this.$t('add_expense') : this.$t('update_expense')">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">

                <FormItem prop="name" :label="this.$t('name')"
                          :error="formItem.errors.get('name')">
                    <Input v-model="formItem.name" :placeholder="this.$t('name')"></Input>
                </FormItem>

                <FormItem prop="category_id"
                          :label="this.$t('category')"
                          :error="formItem.errors.get('category_id')">
                    <Select v-model="formItem.category_id"
                            filterable
                            clearable
                            :loading-text="this.$t('loading')"
                            :not-found-text="this.$t('no_data')"
                            :placeholder="this.$t('placeholder_category')">
                        <Option v-for="option in categoryOptions"
                                :value="option.value"
                                :label="option.label"
                                :key="option.value">
                            {{ option.label }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem prop="cost"
                          :label="this.$t('cost') + ', ' + this.$t('rub')"
                          style="margin-top: 30px"
                          :error="formItem.errors.get('cost')">
                    <Input number
                           v-model="formItem.cost"
                           :placeholder="this.$t('placeholder_expense_cost')"></Input>
                </FormItem>

                <FormItem prop="comment"
                          :label="this.$t('comment')"
                          style="margin-top: 30px"
                          :error="formItem.errors.get('comment')">
                    <Input v-model="formItem.comment" type="textarea" :rows="5"
                    :placeholder="$t('placeholder_expense_comment')"/>
                </FormItem>

                <FormItem prop="expensed_at"
                          :label="this.$t('expensed_at')"
                          :error="formItem.errors.get('expensed_at')">
                    <DatePicker type="datetime"
                                format="dd.MM.yyyy HH:mm"
                                :placeholder="this.$t('placeholder_expense_start_at')"
                                v-model="formItem.expensed_at">
                    </DatePicker>
                </FormItem>

                <FormItem style="margin-top: 30px">
                    <Button v-if="this.$route.name === 'expense.createExpense'"
                            @click.native="handleSubmit('formItem')"
                            type="primary">
                        <span v-if="!createLoading">{{ this.$t('create') }}</span>
                        <span v-else>{{ this.$t('creating') }}</span>
                    </Button>
                    <Button v-if="this.$route.name === 'expense.update'"
                            @click.native="handleUpdate('formItem')"
                            type="primary">
                        <span v-if="!createLoading">{{ this.$t('update') }}</span>
                        <span v-else>{{ this.$t('updating') }}</span>
                    </Button>
                    <Button @click.native="handleReset('formItem')" style="margin-left: 8px">
                        {{ this.$t('clear') }}
                    </Button>
                    <Button :to="{ name: 'expenses' }" style="margin-left: 8px">
                        {{ this.$t('cancel') }}
                    </Button>
                </FormItem>
            </Form>
        </card>
    </div>
</template>

<script>
    import Form from 'vform';
    import {mapGetters} from 'vuex'

    export default {
        metaInfo() {
            return {title: (this.$route.name === 'expense.createExpense') ? this.$t('add_expense') : this.$t('update_expense')}
        },
        data() {
            return {
                createLoading: false,
                formItem: new Form({
                    name: '',
                    category_id: '',
                    cost: 0,
                    comment: '',
                    expensed_at: ''
                }),
                ruleValidate: {
                    name: [
                        {
                            type: 'string', required: true, message: this.$t('validate_name'), trigger: 'blur'
                        }
                    ],
                    cost: [
                        {
                            type: 'integer', required: true, message: this.$t('validate_cost'), trigger: 'blur'
                        }
                    ],
                    category_id: [
                        {
                            required: true,
                            message: this.$t('validate_category'),
                            trigger: 'change'
                        }
                    ],
                    expensed_at: [
                        {
                            type: 'date',
                            required: true,
                            message: this.$t('validate_expensed_at'),
                            trigger: 'change'
                        }
                    ],
                },
            }
        },
        created() {
            this.fetchCategoryOptions();
            this.fetchUpdateData();
        },
        computed: {
            ...mapGetters({
                categoryOptions: 'expense/categoryOptions',
            }),
        },
        methods: {
            async fetchCategoryOptions() {
                await this.$store.dispatch('expense/fetchCategoryOptions');
            },
            handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        let response;
                        try {
                            response = await this.formItem.post('/api/expenses');
                        } catch (e) {
                            this.createLoading = false;
                        }
                        if (response.data.success === true) {
                            this.$router.push('/expenses');
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
                            await this.formItem.put(`/api/expenses/` + this.$route.params.id);
                            this.$router.push('/expenses');
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
                if (this.$route.name !== 'expense.update') return;

                let response = await this.$store.dispatch('expense/fetchExpenseUpdateData', {id: this.$route.params.id});

                if (response.data.status === 'error') {
                    this.$Notice.error({
                        title: this.$t('error_updating'),
                        desc: response.data.message
                    });
                    this.$router.push('/expenses');
                }

                response.data.expensed_at = new Date(response.data.expensed_at);


                this.formItem.fill(response.data);

                this.formItem.category_id = response.data.category_id.toString();
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
        }
    }
</script>

<style>

</style>
