from pathlib import Path
from pypdf import PdfReader, PdfWriter
assets=Path("assets")
docs=[
("workshops-fr.pdf","CLEE_Workshops_Entreprises_2026-2027_FR.pdf","CL�E | Workshops entreprises 2026 / 2027"),
("workshops-en.pdf","CLEE_Company_Workshops_2026-2027_EN.pdf","CL�E | Company workshops 2026 / 2027"),
("CLEE_Cahier_Ingenieur_2026-2027_Projet_et_Proposition.pdf","CLEE_Cahier_Ingenieur_2026-2027_Projet_et_Proposition.pdf","CL�E | Cahier de l'ing�nieur 2026 / 2027 | Projet et proposition")]
for source,target,title in docs:
    source_path=assets/source
    reader=PdfReader(source_path)
    before=[page.extract_text() for page in reader.pages]
    writer=PdfWriter(clone_from=reader)
    writer.add_metadata({"/Title":title,"/Author":"CL�E | Polytechnique Montr�al","/Subject":title})
    output=assets/(target+".tmp")
    writer.write(output)
    check=PdfReader(output)
    assert check.metadata.title==title
    assert len(check.pages)==len(reader.pages)
    assert [page.extract_text() for page in check.pages]==before
    final=assets/target
    output.replace(final)
    print("PASS PDF title, pages and text:",target,len(check.pages))
