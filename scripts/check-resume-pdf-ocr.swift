import Foundation
import PDFKit
import AppKit
import Vision
let pdf=PDFDocument(url:URL(fileURLWithPath:CommandLine.arguments[1]))!
let out=CommandLine.arguments[2]
try! FileManager.default.createDirectory(atPath:out,withIntermediateDirectories:true)
var pages=[[String:Any]]()
for i in 0..<pdf.pageCount {
 let page=pdf.page(at:i)!,box=page.bounds(for:.mediaBox)
 let image=page.thumbnail(of:NSSize(width:box.width*2,height:box.height*2),for:.mediaBox)
 var proposed=CGRect(x:0,y:0,width:box.width*2,height:box.height*2)
 guard let cg=image.cgImage(forProposedRect:&proposed,context:nil,hints:nil)else{fatalError("CG")}
 let png=NSBitmapImageRep(cgImage:cg).representation(using:.png,properties:[:])!
 try! png.write(to:URL(fileURLWithPath:"\(out)/page-\(i+1).png"))
 let request=VNRecognizeTextRequest();request.recognitionLevel = .accurate;request.recognitionLanguages=["ko-KR","en-US"];request.usesLanguageCorrection=false
 try! VNImageRequestHandler(cgImage:cg).perform([request])
 let rows=(request.results ?? []).compactMap{observation->String? in observation.topCandidates(1).first?.string}
 let text=rows.joined(separator:"\n");try! text.write(toFile:"\(out)/page-\(i+1)-ocr.txt",atomically:true,encoding:.utf8)
 pages.append(["page":i+1,"rows":rows,"width":cg.width,"height":cg.height])
 print("PAGE",i+1,"OCR_LINES",rows.count,"TEXT",text.prefix(220).replacingOccurrences(of:"\n",with:" | "))
}
try! JSONSerialization.data(withJSONObject:pages,options:[.prettyPrinted,.sortedKeys]).write(to:URL(fileURLWithPath:"\(out)/ocr.json"))
