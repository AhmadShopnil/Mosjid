"use client";

import React from "react";

export default function GraveyardScrollWrapper({ children }) {
    return (
        <div>
            {React.Children.map(children, (child, index) => {
                return child;
            })}
        </div>
    );
}

export function ScrollSection({ id, children }) {
    return (
        <div id={id} className="scroll-mt-32">
            {children}
        </div>
    );
}
