import { AskResponse, Citation } from "../../api";
import { cloneDeep } from "lodash-es";

type ParsedAnswer = {
  citations: Citation[];
  markdownFormatText: string;
};

export function parseAnswer(answer: AskResponse): ParsedAnswer {
  // Start with the raw answer text
  let answerText = answer.answer;

  // Find all occurrences of [docN], capturing the digits
  const citationLinks = answerText.match(/\[doc(\d+)\]/g) ?? [];

  const filteredCitations: Citation[] = [];
  let reindex = 0;

  citationLinks.forEach(link => {
    // Extract the number N from "[docN]"
    const match = link.match(/\[doc(\d+)\]/);
    if (!match) {
      return;
    }

    const originalIdx = parseInt(match[1], 10) - 1;

    // Guard: ensure citations array exists and index is valid
    if (
      !Array.isArray(answer.citations) ||
      originalIdx < 0 ||
      originalIdx >= answer.citations.length
    ) {
      console.warn(`Skipping invalid citation index: ${match[1]}`);
      return;
    }

    // Deep‑clone so we don't mutate the original
    const citation = cloneDeep(answer.citations[originalIdx]);

    // Avoid duplicate citations by original ID
    if (filteredCitations.some(c => c.id === citation.id)) {
      return;
    }

    // Increment our display counter
    reindex += 1;

    // Replace *all* occurrences of this link with the new display index
    answerText = answerText.replaceAll(link, `[${reindex}]`);

    // Assign IDs for de‑duplication and display
    citation.id = match[1];               // original doc number
    citation.reindex_id = reindex.toString(); // 1‑based display number

    filteredCitations.push(citation);
  });

  return {
    citations: filteredCitations,
    markdownFormatText: answerText
  };
}
