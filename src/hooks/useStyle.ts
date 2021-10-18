import { computed, Ref } from "vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";

export default (property: Ref<TComponent>, rem = false) => {
  const getBorderRadius = (borderRadius?: string) => {
    const arr = borderRadius?.split(",").map((item) => `${item}px`) || [
      0, 0, 0, 0,
    ];
    return {
      "border-top-left-radius": arr[0],
      "border-top-right-radius": arr[1],
      "border-bottom-right-radius": arr[2],
      "border-bottom-left-radius": arr[3],
    };
  };
  const formatPositionValues = (val?: number) => {
    if (val === 0 || val) {
      if (rem) {
        return `${val / 37.5}rem`;
      }
      return `${val}px`;
    }
    return "";
  };
  return computed(() => {
    return {
      height: property.value.height
        ? formatPositionValues(property.value.height)
        : property.value.id === "root"
        ? 0
        : "auto",
      width: property.value.width
        ? formatPositionValues(property.value.width)
        : "auto",
      position: property.value.position,
      top: formatPositionValues(property.value.top),
      left: formatPositionValues(property.value.left),
      right: formatPositionValues(property.value.right),
      bottom: formatPositionValues(property.value.bottom),
      paddingTop: formatPositionValues(property.value.padding?.top),
      paddingLeft: formatPositionValues(property?.value.padding?.left),
      paddingRight: formatPositionValues(property?.value.padding?.right),
      paddingBottom: formatPositionValues(property?.value.padding?.bottom),
      marginTop: formatPositionValues(property?.value.margin?.top),
      marginLeft: formatPositionValues(property?.value.margin?.left),
      marginRight: formatPositionValues(property?.value.margin?.right),
      marginBottom: formatPositionValues(property?.value.margin?.bottom),
      borderTopWidth: formatPositionValues(property?.value.border?.top),
      borderLeftWidth: formatPositionValues(property?.value.border?.left),
      borderRightWidth: formatPositionValues(property?.value.border?.right),
      borderBottomWidth: formatPositionValues(property?.value.border?.bottom),
      borderStyle: property.value.borderStyle,
      borderColor: property.value.borderColor,
      ...getBorderRadius(property.value.borderRadius),
      background:
        property.value.background?.img || property.value.background?.color,
    };
  });
};
