export = G2;
export as namespace G2;

declare namespace G2 {
  /**
   * 图标背景对象
   */
  interface ChartBackground {
    fill: string; // 图表背景色
    fillOpacity: number; // 图表背景透明度
    stroke: string; // 图表边框颜色
    strokeOpacity: number; // 图表边框透明度
    opacity: number; // 图表整体透明度
    lineWidth: number; // 图表边框粗度
    radius: number; // 图表圆角大小
  }

  /**
   * 图标接收的参数
   */
  interface ChartProp {
    container: string | HTMLDivElement;
    width: number;
    height: number;
    padding?:
      | {
          top: number;
          right: number;
          bottom: number;
          left: number;
        }
      | number
      | [number, number, number, number]
      | [string, string];
    background?: ChartBackground;
    plotBackground?: ChartBackground;
    forceFit?: boolean;
    animate?: boolean;
    pixelRatio?: number;
    data?: Object | any;
  }

  interface Coordinate {
    //坐标系旋转，angle 表示旋转的度数，单位为角度。
    rotate(angle: number): Coordinate;
    //坐标系缩放，sx 代表 x 方向缩放比例，sy 代表 y 方向缩放比例，单位为数值。
    scale(sx: number, sy: number): Coordinate;
    //坐标系转置，将 x 或者 y 的起始、结束值倒置。
    reflect(xy?: "x" | "y" | "xy"): Coordinate;
    //将坐标系 x 轴和 y 轴转置。
    transpose(): Coordinate;
  }

  /**
   * 坐标轴标签
   */
  interface AxisChartLabel {
    // 数值，设置坐标轴文本 label 距离坐标轴线的距离
    offset: number;
    // 设置文本的显示样式，还可以是个回调函数，
    // 回调函数的参数为该坐标轴对应字段的数值
    textStyle: (
      text: string
    ) => void | {
      // 文本对齐方向，可取值为
      textAlign: "start" | "middle" | "end";
      // 文本的颜色
      fill: string;
      // 文本大小
      fontSize: number;
      fontWeight: string;
      // 文本粗细
      rotate: number;
      // 文本基准线，可取 top middle bottom，默认为middle
      textBaseline: "top" | "middle" | "bottom";
    };
    // 文本是否需要自动旋转，默认为 true
    autoRotate: boolean;
    /**
     * 用于格式化坐标轴上显示的文本信息的回调函数
     * @param  {string} text  文本值
     * @param  {object} item  该文本值对应的原始数据记录
     * @param  {number} index 索引值
     * @return {string}       返回格式化后的文本值
     */
    formatter(text: string, item, index: number): string;
    /**
     * 使用 html 渲染文本
     * @param  {string} text  文本值
     * @param  {object} item  该文本值对应的原始数据记录
     * @param  {number} index 索引值
     * @return {string}       返回 html 字符串
     */
    htmlTemplate(text: string, item, index: number): string;
  }
  /**
   * 坐标轴线
   */
  interface AxisChartTile {
    autoRotate: boolean; // 是否需要自动旋转，默认为 true
    offset: number; // 数值，设置坐标轴标题距离坐标轴线的距离
    // 设置标题的文本样式
    textStyle: {
      // 文本对齐方向，可取值为： start middle end
      textAlign: "start" | "middle" | "end";
      // 文本的颜色
      fill: string;
      // 文本大小
      fontSize: string;
      // 文本粗细
      fontWeight: string | number;
      // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
      rotate: number;
      // 文本基准线，可取 top middle bottom，默认为middle
      textBaseline: "top" | "middle" | "bottom";
    };
    // 标题的显示位置（相对于坐标轴线），可取值为 start center end
    position: "start" | "center" | "end";
  }

  class ChartAxisConfig {
    position?: "top" | "bottom" | "left" | "right";
    line?: {
      // 坐标轴线的颜色
      stroke?: string;
      // 坐标轴线的透明度，数值范围为 0 - 1
      strokeOpacity?: number;
      /*设置虚线的样式
        * 如 [2, 3]第一个用来表示实线的像素，
        * 第二个用来表示空白的像素。
        * 如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
        */
      lineDash?: [number, number];
      lineWidth?: number;
    } | null;
    label?: AxisChartLabel;
    title?: AxisChartTile;
    tickLine?: {
      // 刻度线宽
      lineWidth: number;
      // 刻度线的颜色
      stroke: string;
      // 刻度线颜色的透明度
      strokeOpacity: number;
      // 刻度线的长度，可以为负值（表示反方向渲染）
      length: number;
    };
    subTickCount?: number;
    subTickLine?: {
      // 次刻度线宽
      lineWidth: number;
      // 次刻度线颜色
      stroke: string;
      // 次刻度线颜色的透明度
      strokeOpacity: number;
      // 次刻度线的长度，可以为负值（表示反方向渲染）
      length: number;
    };
    grid?: {
      // 声明网格顶点从两个刻度中间开始，默认从刻度点开始
      align?: "center";
      // 声明网格的类型，line 表示线，polygon 表示矩形框
      type?: "line" | "polygon";
      // 当网格类型 type 为 line 时，使用 lineStyle 设置样式
      lineStyle?: {
        // 网格线的颜色
        stroke?: string;
        // 网格线的粗细
        lineWidth?: number;
        // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
        lineDash?: [number, number];
      };
      // 当网格类型 type 为 polygon 时，使用 alternateColor 为网格设置交替的颜色
      // 指定一个值则先渲染奇数层，两个值则交替渲染
      alternateColor?: string | [string, string];
      // 是否隐藏第一条网格线，默认为 false
      hideFirstLine: boolean;
      // 是否隐藏最后一条网格线，默认为 false
      hideLastLine: boolean;
    };
  }

  const markerAction: (
    x: number,
    y: number,
    r: number,
    ctx: CanvasRenderingContext2D
  ) => void;
  interface LegendConfig {
    position?: "top" | "bottom" | "left" | "right";
    layout?: "vertica" | "horizontal";
    title?: {
      // 文本对齐方向，可取值为： start middle end
      textAlign: "start" | "middle" | "end";
      // 文本的颜色
      fill: string;
      // 文本大小
      fontSize: string;
      // 文本粗细
      fontWeight: string | number;
      // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
      rotate: number;
      // 文本基准线，可取 top middle bottom，默认为middle
      textBaseline: "top" | "middle" | "bottom";
    };
    offsetX?: number;
    offsetY?: number;
    itemGap?: number;
    itemMarginBottom?: number;
    itemWidth?: number;
    unCheckColor?: string;
    background?: {
      fill?: string;
      fillOpacity?: number;
    };
    allowAllCanceled: number;
    itemFormatter: (value: string) => string;
    marker?: string | markerAction;
    textStyle?: {
      // 文本对齐方向，可取值为： start middle end
      textAlign: "start" | "middle" | "end";
      // 文本的颜色
      fill: string;
      // 文本大小
      fontSize: string;
      // 文本粗细
      fontWeight: string | number;
      // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
      rotate: number;
      // 文本基准线，可取 top middle bottom，默认为middle
      textBaseline: "top" | "middle" | "bottom";
    };
    clickable?: boolean;
    hoverable?: boolean;
    selectedMode?: "single" | "multiple";
    onHover?: (e: MouseEvent) => void;
    onClick?: (e: MouseEvent) => void;
    useHtml?: boolean;
    container?: string;
    containerTpl?: stirng;
    itemTpl: string;
    slidable: boolean;
    width: number;
    height: number;
    custom: number;
    items: Array<{
      value: string; // 图例项的文本内容
      fill: string; // 该图例项 marker 的填充颜色
      marker?: string | markerAction;
    }>;
  }

  interface TooltipConfig {
    triggerOn: "mousemove" | "click" | "none";
    showTitle: boolean;
    title: string;
    crosshairs: {
      // rect 表示矩形框，x 表示水平辅助线，y 表示垂直辅助线，cross 表示十字辅助线
      type: "rect" | "x" | "y" | "cross";
      style: {
        // 图形样式
        fill: { string }; // 填充的颜色
        stroke: { string }; // 边框的颜色
        strokeOpacity: { number }; // 边框颜色的透明度，数值为 0 - 1 范围
        fillOpacity: { number }; // 填充的颜色透明度，数值为 0 - 1 范围
        lineWidth: { number }; // 边框的粗细
        lineDash: { number } | { array }; // 线的虚线样式
      };
    };
    offset?: number;
    inPlot?: boolean;
    follow?: boolean;
    shared?: boolea;
    enterable?: boolean;
    position?: "left" | "righ" | "top" | "bottom";
    hideMarkers?: boolean;
    containerTpl?: string;
    itemTpl?: string;
    "g2-tooltip"?: CSSProperties;
    "g2-tooltip-title"?: CSSProperties;
    "g2-tooltip-list-item"?: CSSProperties;
    "g2-tooltip-list"?: CSSProperties;
    "g2-tooltip-marker"?: CSSProperties;
  }
}

class Chart {
  constructor(ChartProp: {});
  source(data: any): Chart;
  source(data: any, scaleConfig: any): Chart;
  scale(scaleConfig: any): Chart;
  scale(field: string, scaleConfig: any): Chart;
  coord(
    type: "rect" | "polar" | "theta" | "helix",
    coordConfig?: {
      // 设置半径，值范围为 0 至 1
      radius: number;
      // 空心圆的半径，值范围为 0 至 1
      innerRadius: number;
      // 极坐标的起始角度，单位为弧度
      startAngle: number;
      // 极坐标的结束角度，单位为弧度
      endAngle: number;
    }
  ): Coordinate;
  axis(option: boolean): Chart;
  axis(field: string, option: boolean): Chart;
  axis(field: string, axisConfig: ChartAxisConfig): Chart;
  legend(option: boolean): Chart;
  legend(field: string, option: boolean): Chart;
  legend(field: string, legendConfig: ChartAxisConfig);
  tooltip(option: boolean): Chart;
  tooltip(tooltipConfig: TooltipConfig);
}
