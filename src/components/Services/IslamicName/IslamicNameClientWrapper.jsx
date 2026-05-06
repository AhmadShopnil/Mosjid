"use client";

import React, { useRef, useState } from "react";
import IslamicNameTopSection from "@/components/Services/IslamicName/IslamicNameTopSection";
import IslamicNameSection from "@/components/Services/IslamicName/IslamicNameSection";
import PolicyModal from "@/components/Shared/PolicyModal";

export default function IslamicNameClientWrapper({ categories }) {
    const nameListRef = useRef(null);
    const blessedNameRef = useRef(null);
    const searchNameRef = useRef(null);

    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: '', title: '' });

    const handleActionClick = (label) => {
        if (label === "Name List") {
            nameListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (label === "Blessed Name") {
            blessedNameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (label === "Search Name") {
            searchNameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (label === "Islamic Naming Guidelines") {
            setModalConfig({ isOpen: true, slug: "islamic-naming-guidelines", title: "Islamic Naming Guidelines" });
        }
    };

    return (
        <>
            {/* top sections */}
            <div>
                <IslamicNameTopSection onActionClick={handleActionClick} />
            </div>

            {/* list section */}
            <div>
                <IslamicNameSection
                    categories={categories}
                    nameListRef={nameListRef}
                    blessedNameRef={blessedNameRef}
                    searchNameRef={searchNameRef}
                />
            </div>

            <PolicyModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                slug={modalConfig.slug}
                title={modalConfig.title}
            />
        </>
    );
}
