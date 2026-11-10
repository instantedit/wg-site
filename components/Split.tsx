/** Word-by-word split for the GSAP controller. Lines are separated by "|" and each renders as a block.
 *  Wrap words in underscores (`_extraordinary._`) to set them in the italic serif accent. */
export function Split({ text, itClass = "it" }: { text: string; itClass?: string }) {
  return (
    <>
      {text.split("|").map((line, li) => {
        const groups: { it: boolean; words: string[] }[] = [];
        let open = false;
        line.trim().split(" ").forEach((raw) => {
          let w = raw;
          const starts = w.startsWith("_");
          if (starts) w = w.slice(1);
          const ends = /_[.?!,]?$/.test(w);
          if (ends) w = w.replace(/_(?=[.?!,]?$)/, "");
          const it = open || starts;
          const last = groups[groups.length - 1];
          if (last && last.it === it && !(starts && !open)) last.words.push(w);
          else groups.push({ it, words: [w] });
          open = (open || starts) && !ends;
        });
        return (
          <span key={li} className="block">
            {groups.map((g, gi) => {
              const words = g.words.map((w, i) => (
                <span key={i}>
                  <span className="w"><span>{w}</span></span>
                  {i < g.words.length - 1 ? " " : ""}
                </span>
              ));
              return (
                <span key={gi}>
                  {g.it ? <span className={itClass}>{words}</span> : words}
                  {gi < groups.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}
