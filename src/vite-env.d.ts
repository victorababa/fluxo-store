/// <reference types="vite/client" />

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// Adiciona suporte para módulos CSS
// declare module '*.module.css' {
//   const classes: { [key: string]: string };
//   export default classes;
// }

// Adiciona suporte para o alias @/
declare module '@/components/*' {
  import { ComponentType } from 'react';
  const component: ComponentType<any>;
  export default component;
}
