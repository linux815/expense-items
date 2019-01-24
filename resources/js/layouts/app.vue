<template>
    <div class="layout">
        <Layout style="min-height:100vh">
            <navbar></navbar>
            <Layout>
                <Sider :style="{background: '#fff', minWidth: '220px'}" breakpoint="md" collapsible
                       :collapsed-width="78"
                       class="border-slider">
                    <Menu active-name="1" theme="primary" width="auto">
                        <MenuGroup :title="$t('navigation')" style="padding-top: 10px;">
                            <MenuItem name="home" :to="{ name: 'home'}">
                                <Icon type="ios-analytics-outline"/>
                                {{ $t('home') }}
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                    <div slot="trigger"></div>
                    <div class="menu-footer">
                        <p>2019 &copy; Ivan Bazhenov</p>
                        <p>

                        </p>
                    </div>
                </Sider>
                <Content style="padding: 0 24px 24px; min-height: 280px; background: #f5f7f9;">
                    <div style="margin: 24px 0"></div>
                    <template>
                        <child/>
                    </template>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import Navbar from '~/components/Navbar'

    export default {
        name: 'app-layout',
        data() {
            return {
                isCollapsed: false,
                showCard: false
            };
        },
        components: {
            Navbar
        },
        watch: {
            '$route'(to, from) {
                // this.navigateTo(to.name);
                this.showCard = to.name !== 'home';
            }
        }
    }
</script>
<style scoped>
    .layout {
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
    }

    .border-slider::after {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background: #dcdee2;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 18px;
    }

    .collapsed-menu span {
        width: 0;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 20px;
    }

    .menu-footer {
        position: fixed;
        bottom: 15px;
        text-align: center;
    }

    .menu-footer p {
        width: 220px;
        line-height: 25px;
    }

    .menu-footer a {
        color: #9ea7b4;
    }

    .menu-footer a:hover {
        color: #657180;
    }
</style>
