import { computed, Ref } from "vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";

export default (property: Ref<TComponent>) => {
  const formatPositionValues = (val?: number) => {
    if (val === 0 || val) {
      return `${val}px`;
    }
    return "";
  };
  return computed(() => {
    return {
      height: property.value.height ? property.value.height + "px" : "auto",
      width: property.value.width ? property.value.width + "px" : "auto",
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
    };
  });
};
