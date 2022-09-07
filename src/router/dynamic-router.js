const User = () => import('../pages/user-manage')
const UserList = () => import('../pages/user-manage/user-list')
const RoleManage = () => import('../pages/user-manage/role-manage')
const PermissionManage = () => import('../pages/user-manage/permission-manage')

const dynamicRoutes = [
    {
        path: '/user',
        component: User,
        name: 'user-manage',
        meta: {
            name: '用户管理',
            icon: 'icon-email'
        },
        children: [
            {
                path: 'list',
                component: UserList,
                name: 'user-list',
                meta: {
                    name: '用户列表'
                }
            },
            {
                path: 'role',
                component: RoleManage,
                name: 'role-manage',
                meta: {
                    name: '角色管理'
                }
            },
            {
                path: 'permission',
                component: PermissionManage,
                name: 'permission-manage',
                meta: {
                    name: '权限管理'
                }
            }
        ]

    }
]

export default dynamicRoutes
