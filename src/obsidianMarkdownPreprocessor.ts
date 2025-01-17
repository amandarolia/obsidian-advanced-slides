import { BlockProcessor } from "./blockProcessor";
import { ExcalidrawProcessor } from "./excalidrawProcessor";
import { FootnoteProcessor } from "./footNoteProcessor";
import { FormatProcessor } from "./formatProcessor";
import { FragmentProcessor } from "./fragmentProcessor";
import { ImageProcessor } from "./imageProcessor";
import { InternalLinkProcessor } from "./internalLinkProcessor";
import { LatexProcessor } from "./latexProcessor";
import { MermaidProcessor } from "./mermaidProcessor";
import { MultipleFileProcessor } from "./multipleFileProcessor";
import { ObsidianUtils } from "./obsidianUtils";

export class ObsidianMarkdownPreprocessor {

	private multipleFileProcessor: MultipleFileProcessor;
	private blockProcessor: BlockProcessor;
	private imageProcessor: ImageProcessor;
	private internalLinkProcessor: InternalLinkProcessor;
	private footnoteProcessor: FootnoteProcessor;
	private latexProcessor: LatexProcessor;
	private formatProcessor: FormatProcessor;
	private excalidrawProcessor: ExcalidrawProcessor;
	private mermaidProcessor: MermaidProcessor;
	private fragmentProcessor: FragmentProcessor;

	constructor(utils: ObsidianUtils) {
		this.multipleFileProcessor = new MultipleFileProcessor(utils);
		this.blockProcessor = new BlockProcessor();
		this.imageProcessor = new ImageProcessor(utils);
		this.internalLinkProcessor = new InternalLinkProcessor(utils);
		this.footnoteProcessor = new FootnoteProcessor();
		this.latexProcessor = new LatexProcessor();
		this.formatProcessor = new FormatProcessor();
		this.excalidrawProcessor = new ExcalidrawProcessor(utils);
		this.mermaidProcessor = new MermaidProcessor();
		this.fragmentProcessor = new FragmentProcessor();
	}

	process(markdown: string, options: any) {
		const afterMultipleFileProcessor = this.multipleFileProcessor.process(markdown);
		const afterMermaidProcessor = this.mermaidProcessor.process(afterMultipleFileProcessor);
		const afterBlockProcessor = this.blockProcessor.process(afterMermaidProcessor);
		const afterFootNoteProcessor = this.footnoteProcessor.process(afterBlockProcessor, options);
		const afterExcalidrawProcessor = this.excalidrawProcessor.process(afterFootNoteProcessor);
		const afterImageProcessor = this.imageProcessor.process(afterExcalidrawProcessor);
		const afterInternalLinkProcessor = this.internalLinkProcessor.process(afterImageProcessor, options);
		const afterLatexProcessor = this.latexProcessor.process(afterInternalLinkProcessor);
		const afterFormatProcessor = this.formatProcessor.process(afterLatexProcessor);
		const afterFragmentProcessor = this.fragmentProcessor.process(afterFormatProcessor, options);
		return afterFragmentProcessor;
	}



}


