import { getFileType } from "./S3Upload.jsx";

// These cases encode exactly the filenames that previously broke: the old
// `fileName.slice(fileName.indexOf('.')+1)` used the FIRST dot and preserved
// case, so multi-dot and uppercase filenames produced a value the Python
// Lambda's case-sensitive checks ('pdf'/'jpeg'/'jpg'/'png') never matched.
describe("getFileType", () => {
    test("single-dot filename returns the extension", () => {
        expect(getFileType("report.pdf")).toBe("pdf");
    });

    test("multi-dot filename returns only the last extension", () => {
        expect(getFileType("Q1.report.pdf")).toBe("pdf");
    });

    test("many-dot filename returns only the last extension", () => {
        expect(getFileType("my.financial.data.pdf")).toBe("pdf");
    });

    test("uppercase extension is lowercased", () => {
        expect(getFileType("report.PDF")).toBe("pdf");
    });

    test("filename with spaces and parentheses returns the extension", () => {
        expect(getFileType("scan (1).pdf")).toBe("pdf");
    });

    test("uppercase jpeg extension is lowercased", () => {
        expect(getFileType("image.JPEG")).toBe("jpeg");
    });

    test("filename with no dot returns empty string", () => {
        expect(getFileType("noextension")).toBe("");
    });
});
