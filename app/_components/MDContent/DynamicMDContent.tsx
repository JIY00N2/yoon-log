import dynamic from "next/dynamic";

const DynamicMDContent = dynamic(() => import("./StaticMDContent"));

export default DynamicMDContent;
