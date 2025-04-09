import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { MenuEntity } from '@/modules/Access/entities';
import { MenuRepository } from '@/modules/Access/repositories';
import { CreateMenuDto } from '@/modules/Access/dtos';
import { AccessType } from '@/modules/Access/enums';

@Injectable()
export class MenuService extends BaseService<MenuEntity, MenuRepository> {
  constructor(protected repository: MenuRepository) {
    super(repository);
  }

  async create(data: CreateMenuDto) {
    const parent = data.parent
      ? await this.repository.findOne({
          where: { id: data.parent },
        })
      : null;
    switch (data.type) {
      case AccessType.FOLDER:
        await this.handleCreateFolder(parent);
        break;
      case AccessType.MENU:
        await this.handleCreateMenu(parent);
        break;
      case AccessType.BUTTON:
        await this.handleCreateButton(parent);
        break;
    }
    return await this.repository.save({ ...data, parent });
  }

  private async handleCreateFolder(parent: MenuEntity) {
    if (parent && [AccessType.MENU, AccessType.BUTTON].includes(parent.type)) {
      throw new HttpException(
        'MENU 和 BUTTON 不能是FOLDER的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async handleCreateMenu(parent: MenuEntity) {
    if (parent && [AccessType.BUTTON, AccessType.MENU].includes(parent.type)) {
      throw new HttpException(
        'MENU 和 BUTTON 不能是MENU的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async handleCreateButton(parent: MenuEntity) {
    if (!parent) {
      throw new HttpException('请为该权限指定父权限', HttpStatus.BAD_REQUEST);
    } else if ([AccessType.BUTTON, AccessType.FOLDER].includes(parent.type)) {
      throw new HttpException(
        'BUTTON 和 FOLDER 不能是BUTTON的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async menuList() {
    // @ts-ignore
    return [
      {
        path: '/home/index',
        element: '/home/index',
        meta: {
          key: 'home',
          icon: 'HomeOutlined',
          title: '首页',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: true,
        },
      },
      {
        path: '/dataScreen/index',
        element: '/dataScreen/index',
        meta: {
          key: 'dataScreen',
          icon: 'PieChartOutlined',
          title: '数据大屏',
          isLink: '',
          isHide: false,
          isFull: true,
          isAffix: false,
        },
      },
      {
        path: '/auth',
        redirect: '/auth/page',
        meta: {
          key: 'auth',
          icon: 'LockOutlined',
          title: '权限管理',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/auth/page',
            element: '/auth/page/index',
            meta: {
              key: 'pageMenu',
              icon: 'AppstoreOutlined',
              title: '页面权限',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/auth/button',
            element: '/auth/button/index',
            meta: {
              key: 'authButton',
              icon: 'AppstoreOutlined',
              title: '按钮权限',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/assembly',
        redirect: '/assembly/guide',
        meta: {
          key: 'assembly',
          icon: 'MedicineBoxOutlined',
          title: '常用组件',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/assembly/guide',
            element: '/assembly/guide/index',
            meta: {
              key: 'guide',
              icon: 'AppstoreOutlined',
              title: '引导页',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/assembly/echarts',
            element: '/assembly/echarts/index',
            meta: {
              key: 'echarts',
              icon: 'AppstoreOutlined',
              title: 'ECharts',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/assembly/svgIcon',
            element: '/assembly/svgIcon/index',
            meta: {
              key: 'svgIcon',
              icon: 'AppstoreOutlined',
              title: 'SVG 图标',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/assembly/statistic',
            element: '/assembly/statistic/index',
            meta: {
              key: 'statistic',
              icon: 'AppstoreOutlined',
              title: '统计数值',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/assembly/qrCode',
            element: '/assembly/qrCode/index',
            meta: {
              key: 'qrCode',
              icon: 'AppstoreOutlined',
              title: '二维码',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/assembly/watermark',
            element: '/assembly/watermark/index',
            meta: {
              key: 'watermark',
              icon: 'AppstoreOutlined',
              title: '水印',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/feat',
        redirect: '/feat/tabs',
        meta: {
          key: 'feat',
          icon: 'ControlOutlined',
          title: '常用功能',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/feat/tabs',
            element: '/feat/tabs/index',
            meta: {
              key: 'tabs',
              icon: 'AppstoreOutlined',
              title: '标签栏',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
            children: [
              {
                path: '/feat/tabs/detail/:id',
                element: '/feat/tabs/detail',
                meta: {
                  key: 'tabsDetail',
                  icon: 'AppstoreOutlined',
                  title: 'Tab 详情',
                  activeMenu: '/feat/tabs',
                  isLink: '',
                  isHide: true,
                  isFull: false,
                  isAffix: false,
                },
              },
            ],
          },
          {
            path: '/feat/breadcrumb',
            redirect: '/feat/breadcrumb/flat',
            meta: {
              key: 'breadcrumb',
              icon: 'AppstoreOutlined',
              title: '面包屑',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
            children: [
              {
                path: '/feat/breadcrumb/flat',
                element: '/feat/breadcrumb/flat/index',
                meta: {
                  key: 'breadcrumbFlat',
                  icon: 'AppstoreOutlined',
                  title: '平级模式',
                  isLink: '',
                  isHide: false,
                  isFull: false,
                  isAffix: false,
                },
              },
              {
                path: '/feat/breadcrumb/flatDetail',
                element: '/feat/breadcrumb/flat/detail',
                meta: {
                  key: 'breadcrumbFlatDetail',
                  icon: 'AppstoreOutlined',
                  title: '平级详情',
                  activeMenu: '/feat/breadcrumb/flat',
                  isLink: '',
                  isHide: true,
                  isFull: false,
                  isAffix: false,
                },
              },
              {
                path: '/feat/breadcrumb/children',
                element: '/feat/breadcrumb/children/index',
                meta: {
                  key: 'breadcrumbChildren',
                  icon: 'AppstoreOutlined',
                  title: '层级模式',
                  isLink: '',
                  isHide: false,
                  isFull: false,
                  isAffix: false,
                },
                children: [
                  {
                    path: '/feat/breadcrumb/children/detail',
                    element: '/feat/breadcrumb/children/detail',
                    meta: {
                      key: 'breadcrumbChildrenDetail',
                      icon: 'AppstoreOutlined',
                      title: '层级详情',
                      activeMenu: '/feat/breadcrumb/children',
                      isLink: '',
                      isHide: true,
                      isFull: false,
                      isAffix: false,
                    },
                  },
                ],
              },
            ],
          },
          {
            path: '/feat/globalization',
            element: '/feat/globalization/index',
            meta: {
              key: 'globalization',
              icon: 'AppstoreOutlined',
              title: '国际化',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/feat/clipboard',
            element: '/feat/clipboard/index',
            meta: {
              key: 'clipboard',
              icon: 'AppstoreOutlined',
              title: '剪贴板',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/feat/colorPicker',
            element: '/feat/colorPicker/index',
            meta: {
              key: 'colorPicker',
              icon: 'AppstoreOutlined',
              title: '取色器',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/list',
        redirect: '/list/useProTable',
        meta: {
          key: 'list',
          icon: 'TableOutlined',
          title: '列表页面',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/list/useProTable',
            element: '/list/useProTable/index',
            meta: {
              key: 'useProTable',
              icon: 'AppstoreOutlined',
              title: '使用 ProTable',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/list/useEditTable',
            element: '/list/useEditTable/index',
            meta: {
              key: 'useEditTable',
              icon: 'AppstoreOutlined',
              title: '使用 EditTable',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/list/useDragTable',
            element: '/list/useDragTable/index',
            meta: {
              key: 'useDragTable',
              icon: 'AppstoreOutlined',
              title: '使用 DragTable',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/list/useProList',
            element: '/list/useProList/index',
            meta: {
              key: 'ProList',
              icon: 'AppstoreOutlined',
              title: '使用 ProList',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/form',
        redirect: '/form/basicForm',
        meta: {
          key: 'form',
          icon: 'FormOutlined',
          title: '表单页面',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/form/basicForm',
            element: '/form/basicForm/index',
            meta: {
              key: 'basicForm',
              icon: 'AppstoreOutlined',
              title: '基础表单',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/form/stepForm',
            element: '/form/stepForm/index',
            meta: {
              key: 'stepForm',
              icon: 'AppstoreOutlined',
              title: '分步表单',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/form/advancedForm',
            element: '/form/advancedForm/index',
            meta: {
              key: 'advancedForm',
              icon: 'AppstoreOutlined',
              title: '高级表单',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/details',
        redirect: '/details/basicDetails',
        meta: {
          key: 'details',
          icon: 'ProfileOutlined',
          title: '详情页面',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/details/basicDetails',
            element: '/details/basicDetails/index',
            meta: {
              key: 'basicDetails',
              icon: 'AppstoreOutlined',
              title: '基础详情页',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/result',
        redirect: '/result/success',
        meta: {
          key: 'result',
          icon: 'CheckCircleOutlined',
          title: '结果页面',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/result/success',
            element: '/result/success/index',
            meta: {
              key: 'success',
              icon: 'AppstoreOutlined',
              title: '成功页',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/result/fail',
            element: '/result/fail/index',
            meta: {
              key: 'fail',
              icon: 'AppstoreOutlined',
              title: '失败页',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/result/warning',
            element: '/result/warning/index',
            meta: {
              key: 'warning',
              icon: 'AppstoreOutlined',
              title: '警告页',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/result/info',
            element: '/result/info/index',
            meta: {
              key: 'info',
              icon: 'AppstoreOutlined',
              title: '信息页',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/menu',
        redirect: '/menu/menu1',
        meta: {
          key: 'menu',
          icon: 'ProfileOutlined',
          title: '菜单嵌套',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/menu/menu1',
            element: '/menu/menu1/index',
            meta: {
              key: 'menu1',
              icon: 'AppstoreOutlined',
              title: '菜单1',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/menu/menu2',
            redirect: '/menu/menu2/menu21',
            meta: {
              key: 'menu2',
              icon: 'AppstoreOutlined',
              title: '菜单2',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
            children: [
              {
                path: '/menu/menu2/menu21',
                element: '/menu/menu2/menu21/index',
                meta: {
                  key: 'menu21',
                  icon: 'AppstoreOutlined',
                  title: '菜单2-1',
                  isLink: '',
                  isHide: false,
                  isFull: false,
                  isAffix: false,
                },
              },
              {
                path: '/menu/menu2/menu22',
                redirect: '/menu/menu2/menu22/menu221',
                meta: {
                  key: 'menu22',
                  icon: 'AppstoreOutlined',
                  title: '菜单2-2',
                  isLink: '',
                  isHide: false,
                  isFull: false,
                  isAffix: false,
                },
                children: [
                  {
                    path: '/menu/menu2/menu22/menu221',
                    element: '/menu/menu2/menu22/menu221/index',
                    meta: {
                      key: 'menu221',
                      icon: 'AppstoreOutlined',
                      title: '菜单2-2-1',
                      isLink: '',
                      isHide: false,
                      isFull: false,
                      isAffix: false,
                    },
                  },
                  {
                    path: '/menu/menu2/menu22/menu222',
                    element: '/menu/menu2/menu22/menu222/index',
                    meta: {
                      key: 'menu222',
                      icon: 'AppstoreOutlined',
                      title: '菜单2-2-2',
                      isLink: '',
                      isHide: false,
                      isFull: false,
                      isAffix: false,
                    },
                  },
                ],
              },
              {
                path: '/menu/menu2/menu23',
                element: '/menu/menu2/menu23/index',
                meta: {
                  key: 'menu23',
                  icon: 'AppstoreOutlined',
                  title: '菜单2-3',
                  isLink: '',
                  isHide: false,
                  isFull: false,
                  isAffix: false,
                },
              },
            ],
          },
          {
            path: '/menu/menu3',
            element: '/menu/menu3/index',
            meta: {
              key: 'menu3',
              icon: 'AppstoreOutlined',
              title: '菜单3',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      // {
      //   path: '/product',
      //   meta: {
      //     icon: 'ProfileOutlined',
      //     isAffix: false,
      //     isFull: false,
      //     isHide: false,
      //     isLink: '',
      //     key: 'category',
      //     title: '商品管理',
      //   },
      //   redirect: '/product/category',
      //   children: [
      //     {
      //       path: '/product/category',
      //       element: '/product/category/index',
      //       meta: {
      //         key: 'categoryManage',
      //         icon: 'AppstoreOutlined',
      //         title: '分类管理',
      //         isLink: '',
      //         isHide: false,
      //         isFull: false,
      //         isAffix: false,
      //       },
      //     },
      //   ],
      // },
      {
        path: '/system',
        redirect: '/system/accountManage',
        meta: {
          key: 'system',
          icon: 'SettingOutlined',
          title: '系统管理',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/system/accountManage',
            element: '/system/accountManage/index',
            meta: {
              key: 'accountManage',
              icon: 'AppstoreOutlined',
              title: '账号管理',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/system/roleManage',
            element: '/system/roleManage/index',
            meta: {
              key: 'roleManage',
              icon: 'AppstoreOutlined',
              title: '角色管理',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/system/menuMange',
            element: '/system/menuMange/index',
            meta: {
              key: 'menuMange',
              icon: 'AppstoreOutlined',
              title: '菜单管理',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/link',
        redirect: '/link/bing',
        meta: {
          key: 'link',
          icon: 'PaperClipOutlined',
          title: '外部链接',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
        children: [
          {
            path: '/link/bing',
            element: '/link/bing/index',
            meta: {
              key: 'bing',
              icon: 'AppstoreOutlined',
              title: 'Bing 内嵌',
              isLink: '',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/link/gitee',
            element: '/link/gitee/index',
            meta: {
              key: 'gitee',
              icon: 'AppstoreOutlined',
              title: 'Gitee 仓库',
              isLink: 'https://gitee.com/HalseySpicy/Hooks-Admin',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/link/github',
            element: '/link/github/index',
            meta: {
              key: 'github',
              icon: 'AppstoreOutlined',
              title: 'GitHub 仓库',
              isLink: 'https://github.com/HalseySpicy/Hooks-Admin',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
          {
            path: '/link/juejin',
            element: '/link/juejin/index',
            meta: {
              key: 'juejin',
              icon: 'AppstoreOutlined',
              title: 'JueJin 主页',
              isLink: 'https://juejin.cn/user/3263814531551816/posts',
              isHide: false,
              isFull: false,
              isAffix: false,
            },
          },
        ],
      },
      {
        path: '/about/index',
        element: '/about/index',
        meta: {
          key: 'about',
          icon: 'ExclamationCircleOutlined',
          title: '关于项目',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: false,
        },
      },
      {
        path: '/noLayout/index',
        element: '/noLayout/index',
        meta: {
          key: 'noLayout',
          icon: 'SelectOutlined',
          title: 'No Layout',
          isLink: '',
          isHide: true,
          isFull: true,
          isAffix: false,
        },
      },
    ];
  }
}
