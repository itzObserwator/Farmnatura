import type { ElementType } from "react";
/** Separate word masks let GSAP reveal text without hiding it from screen readers. */
export function RevealText({
  as: Tag = "p",
  children,
  className = "",
}: {
  as?: ElementType;
  children: string;
  className?: string;
}) {
  return (
    <Tag className={className} data-lines>
      {children.split(/(\s+)/).map((word, i) =>
        /^\s+$/.test(word) ? (
          word
        ) : (
          <span className="word-mask" key={i}>
            <span className="word-inner">{word}</span>
          </span>
        ),
      )}
    </Tag>
  );
}
