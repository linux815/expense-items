<template>
    <Header class="header">
        <Menu mode="horizontal" theme="light" active-name="1">
            <div class="layout-logo">
                <router-link :to="{ name: 'home' }">
                    {{ appName }}
                </router-link>
            </div>
            <div class="layout-nav">
                <Row type="flex" justify="end" align="middle">
                    <Menu mode="horizontal" on-select theme="light" active-name="1">
                        <locale-dropdown/>
                    </Menu>
                </Row>
            </div>
        </Menu>
    </Header>
</template>

<script>
    import {mapGetters} from 'vuex'
    import LocaleDropdown from './LocaleDropdown'

    export default {
        data: () => ({
            appName: window.config.appName
        }),

        computed: mapGetters({
            user: 'auth/user'
        }),

        components: {
            LocaleDropdown
        },

        methods: {
            async logout() {
                // Log out the user.
                await this.$store.dispatch('auth/logout');

                // Redirect to login.
                this.$router.push({name: 'login'})
            }
        }
    }
</script>

<style scoped>

    .layout-nav {
        width: 100%;
        margin: 0 20px 0 auto;
    }

    .layout-logo {
        float: left;
        font-weight: bold;
        font-variant: petite-caps;
    }

    .layout-logo a {
        color: #2d8cf0;
        font-size: 20px;
    }

    .layout-logo a:hover {
        color: #2b85e4;
    }

    .header {
        background: #fff;
        height: 60px;
        border-bottom: 1px solid #dcdee2;
    }

    .logo {
        height: 35px;
        position: relative;
        top: 9px;
    }
</style>

