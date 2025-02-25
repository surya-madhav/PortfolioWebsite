'use client';

import React, { useEffect } from 'react';

interface MermaidRendererProps {
  htmlContent: string;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ htmlContent }) => {
  useEffect(() => {
    // Dynamically import mermaid
    import('mermaid').then((mermaid) => {
      mermaid.default.initialize({
        startOnLoad: true,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'inherit',
      });
      
      // Initialize Mermaid after the component is mounted
      mermaid.default.run();
    });
  }, [htmlContent]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default MermaidRenderer;
