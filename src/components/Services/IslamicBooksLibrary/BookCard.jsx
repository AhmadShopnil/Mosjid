"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { getPDFLinkByMetaName } from '@/helper/metaHelpers';

export default function BookCard({ book }) {
    const [downloading, setDownloading] = useState(false);

    // Map API response fields
    const title = book?.name || book?.title || "Untitled";
    const image = book?.image || "/images/offerServices/book3d.svg";

    // PDF link — the primary field the API uses
    const pdfLink = getPDFLinkByMetaName(book, "pdf_book")
        || book?.extra_fields?.pdf_book_link
        || book?.extra_fields?.pdf_url
        || book?.extra_fields?.pdf
        || null;

    // Writer from categories
    const writerCategory = book?.categories?.find(
        (c) => c?.taxonomy_type === "islamic-library-writer-name"
    );
    const author = writerCategory?.name || book?.author || "—";

    // Volume from extra_fields
    const volume = book?.extra_fields?.volume || book?.volume || null;

    // Download handler — goes through our server proxy to bypass CORS
    // and force Content-Disposition: attachment
    const handleDownload = async () => {
        if (!pdfLink) return;
        setDownloading(true);
        try {
            const filename = pdfLink.split("/").pop() || `${title}.pdf`;
            const proxyUrl = `/api/download-pdf?url=${encodeURIComponent(pdfLink)}&filename=${encodeURIComponent(filename)}`;
            
            const a = document.createElement("a");
            a.href = proxyUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error("Download failed:", err);
            window.open(pdfLink, "_blank");
        } finally {
            // Small delay so spinner shows briefly even for fast responses
            setTimeout(() => setDownloading(false), 1500);
        }
    };

    return (
        <div className='rounded-xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
            <div className="flex gap-4 p-4 bg-white shadow-sm rounded-[11px]">
                {/* Book Cover */}
                <div className="w-[120px] shrink-0 border-r-2 border-gray-200 pr-3">
                    <Image
                        src={image}
                        alt={title}
                        width={110}
                        height={160}
                        className="object-contain"
                    />
                </div>

                {/* Book Info */}
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base lg:text-lg leading-snug line-clamp-2">
                            {title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">{author}</p>
                        {volume && (
                            <p className="text-xs md:text-sm text-gray-500">
                                Volume : {volume}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {/* Read Online — opens PDF in new browser tab */}
                        {pdfLink ? (
                            <a
                                href={pdfLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-1.5 text-xs md:text-sm font-semibold border border-gray-200 text-[#00401A]
                                    rounded-full hover:text-white hover:bg-[#00401A] cursor-pointer transition-all"
                            >
                                Read Online
                            </a>
                        ) : (
                            <button
                                disabled
                                className="px-4 py-1.5 text-xs md:text-sm font-semibold border border-gray-200 text-gray-400
                                    rounded-full cursor-not-allowed opacity-50"
                            >
                                Read Online
                            </button>
                        )}

                        {/* PDF Download — fetches as blob to force browser download */}
                        <button
                            onClick={handleDownload}
                            disabled={!pdfLink || downloading}
                            className={`px-4 py-1.5 text-xs md:text-sm font-semibold border border-gray-200
                                rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer
                                ${pdfLink && !downloading
                                    ? "text-[#00401A] hover:text-white hover:bg-[#00401A]"
                                    : "text-gray-400 opacity-50 cursor-not-allowed"
                                }`}
                        >
                            {downloading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Downloading...
                                </>
                            ) : (
                                <>
                                    PDF
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
