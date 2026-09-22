
import React from "react";
import Image from "next/image";

export default function Brand() {
  return (
		<section id="brand" className="bg-white py-10 sm:py-16">
			<div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 flex justify-center">
				<Image
					src="/Partner.png"
					alt="We are your partner"
					width={1942}
					height={809}
					sizes="(max-width: 1180px) 100vw, 1180px"
					className="h-auto w-full max-w-[900px]"
				/>
			</div>
		</section>
	);
}

