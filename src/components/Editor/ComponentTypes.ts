import { IComponent } from './BuiltInComponents/Component';
import { IContainer } from './BuiltInComponents/Container';
import { IImg } from '@/components/Editor/BuiltInComponents/Img';
import { ITab } from '@/components/Editor/TrilateralComponents/Vant/Tab';
import { IButton } from '@/components/Editor/BuiltInComponents/Button';
import { INoticeBar } from '@/components/Editor/TrilateralComponents/Vant/NoticeBar/index';

// 所有组件类型及名称
export enum ComponentType {
  Container = 'HContainer',
  Img = 'HImg',
  Text = 'HText',
  Tab = 'HTab',
  Button = 'HButton',
  NoticeBar = 'NoticeBar',
  Swiper = 'Swiper',
  NavBar = 'NavBar',
}

export enum ComponentSettingType {
  Container = 'ContainerSetting',
  Img = `ImgSetting`,
}

// 用于侧边栏组件列表中单个组件的接口
export interface IComponentItem {
  type: ComponentType;
  icon: string;
  name: string;
}

// 侧边栏组件列表
export const ComponentList: IComponentItem[] = [
  { type: ComponentType.Container, icon: 'xxx', name: '容器' },
  { type: ComponentType.Img, icon: 'xxx', name: '图片' },
  { type: ComponentType.Text, icon: 'xxx', name: '文本' },
  { type: ComponentType.Tab, icon: 'xxx', name: '选项卡' },
  { type: ComponentType.Button, icon: 'xxx', name: '按钮' },
  { type: ComponentType.NoticeBar, icon: 'xxx', name: '通知栏' },
  { type: ComponentType.Swiper, icon: 'xxx', name: '轮播' },
  { type: ComponentType.NavBar, icon: 'xxx', name: '导航栏' },
];

export type TComponent = IComponent &
  IContainer &
  IImg &
  ITab &
  IButton &
  INoticeBar;
export type PartOfComponent =
  | IComponent
  | IContainer
  | IImg
  | ITab
  | IButton
  | INoticeBar;
