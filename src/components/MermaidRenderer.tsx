'use client';

import React, { useEffect, useState } from 'react';

interface MermaidRendererProps {
  htmlContent: string;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ htmlContent }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
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
    }
  }, [htmlContent, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default MermaidRenderer;
