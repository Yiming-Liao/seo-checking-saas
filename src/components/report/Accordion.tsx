import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface AccordionProps {
    head: React.ReactNode;
    body: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ head, body }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const accordionBodyRef = useRef<HTMLDivElement | null>(null);

    const tl = gsap.timeline();


    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // 如果點擊的是 <a> 標籤，則不進行切換
        if ((event.target as HTMLElement).tagName === 'A') {
            return;
        }
        setIsOpen(prev => !prev);
    };


    useEffect(() => {
        if (!isOpen) {
            tl.to(accordionBodyRef.current, {
                height: '0px', duration: .2
            })
        } else {
            tl.to(accordionBodyRef.current, {
                height: 'auto', duration: .2
            })
        }
    }, [isOpen])


    return (
        <div className="w-full">
            <button onClick={handleClick} className="w-full">
                {head}
            </button>
            {/* Accordion */}
            <div ref={accordionBodyRef} className="h-0 overflow-hidden">
                {body}
            </div>
        </div>
    )
}
export default Accordion;