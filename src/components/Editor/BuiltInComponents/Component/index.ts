import {
  BorderStyle,
  Position,
} from '@/components/Editor/BuiltInComponents/Layout';
import { v4 as uuidv4 } from 'uuid';
import { fastInitProps } from '@/util';
import { ComponentType } from '@/components/Editor/ComponentTypes';
import { IEvent } from '@/components/Editor/Event';
import { DISPLAY } from '@/components/Editor/BuiltInComponents/Container';

export interface IBackground {
  color?: string;
  url?: string;
  repeat?: string;
  size?: string;
  horizontal?: string;
  vertical?: string;
}

export interface IAroundValue {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface IComponent {
  type: ComponentType;
  id: string;
  width: number | string;
  height: number | string;
  position: Position;
  background: IBackground;
  lock: boolean;
  display: DISPLAY;
  zIndex?: number;
  parentId?: string;
  alias?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  padding?: IAroundValue;
  margin?: IAroundValue;
  border?: IAroundValue;
  borderStyle?: BorderStyle;
  borderColor?: string;
  borderRadius?: string;
  events?: IEvent[];
  flex?: string;
}

/**
 *基础组件类，包含一个组件最基本的信息
 */
abstract class Component implements IComponent {
  abstract type: ComponentType;
  id: string;
  width: string | number = '';
  height: string | number = 100;
  position: Position = 'static';
  lock = false;
  alias?: string = '';
  borderRadius?: string = '0,0,0,0';
  borderStyle: BorderStyle = 'solid';
  background: IBackground = {
    color: '',
    url: '',
    size: '',
    horizontal: '',
    vertical: '',
    repeat: '',
  };
  display: DISPLAY = DISPLAY.BLOCK;

  protected constructor(props?: Partial<IComponent>) {
    this.id = uuidv4();
    this.alias = props?.type;
    fastInitProps(props, this);
  }
}

export default Component;
