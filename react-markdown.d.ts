// react-markdown.d.ts
declare module 'react-markdown' {
    import { ComponentType } from 'react';
  
    interface ReactMarkdownProps {
      children: string;
      className?: string;
    }
  
    const ReactMarkdown: ComponentType<ReactMarkdownProps>;
  
    export default ReactMarkdown;
  }
  