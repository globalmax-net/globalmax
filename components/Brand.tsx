import React from "react";
import Image from "next/image";

export default function Brand() {
  return (
		<section id="brand" className="bg-gm-paper-2 py-10 sm:py-16 shadow-lg">
			<div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 flex justify-center">
				<Image
					src="/Partner.png"
					alt="We are your partner"
					width={1600}
					height={700}
					sizes="(max-width: 1100px) 100vw, 1180px"
					className="h-auto w-full max-w-[600px] shadow-lg rounded-lg"
				/>
			</div>
		</section>
	);
}