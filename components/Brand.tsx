import React from "react";
import Image from "next/image";

export default function Brand() {
  return (
		<section id="brand" className="bg-white py-8 sm:py-10">
			<div className="gm-container px-4 sm:px-6 md:px-10 flex justify-center">
				<Image
					src="/Partner.png"
					alt="We are your partner"
					width={1600}
					height={700}
					sizes="(max-width: 1100px) 100vw, 1180px"
					className="h-auto w-full max-w-[600px] shadow-lg rounded-lg xl:max-w-[760px] 2xl:max-w-[900px]"
				/>
			</div>
		</section>
	);
}