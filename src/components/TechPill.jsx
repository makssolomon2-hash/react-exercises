
export default function TechPill({ name, detail, href, Icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="demo-tech-pill flex cursor-pointer items-start gap-3 border border-white/10 bg-white/5 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
        >
            <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-300" />
            <span>
                <span className="block font-semibold text-white">{name}</span>
                <span className="mt-1 block text-sm text-neutral-400">{detail}</span>
            </span>
        </a>
    )
}
