import { Component, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Link } from '../model/link';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  @Output() key: string;

  private linkDoc: AngularFirestoreDocument<Link>;
  private link: Observable<any>;

  constructor(private route: ActivatedRoute, public db: AngularFirestore) {
    this.key = this.route.snapshot.params['id'];
    this.link = db.collection('links', ref => ref.where('shortLink', '==', this.key)).snapshotChanges();
    this.link.subscribe((snapshot) => {
      if (snapshot.length > 0) {
        snapshot.forEach((value) => {
          this.linkDoc = this.getDocumentLink(value);
        })
      }
      if (this.linkDoc != undefined) {
        this.linkDoc.valueChanges().subscribe((link) => {
          if (link.count == undefined) {
            console.log("+1");
            link.count = 1;
            this.linkDoc.update(link);
            this.redirect(String(link.link));
          } else {
            console.log('só 1')
            link.count = Number(link.count) + 1;
            this.linkDoc.update(link);
            this.redirect(String(link.link));
          }
        })
      }
    })
  }

  ngOnInit() {
    // this.link.subscribe((s)=>{
    //   if(s.length >0){
    //      s.forEach(element => {
    //         this.linkDoc = this.db.doc<Link>("links/"+element.payload.doc.id);
    //     });  
    //   }
    //   if (this.linkDoc != undefined){
    //     this.linkDoc.valueChanges().subscribe((snp)=>{
    //       this.addC(snp);
    //     })
    //   }else{
    //     console.log("foise");
    //   }

    // })
  }

  getDocumentLink(value: any) {
    return this.db.doc<Link>("links/" + value.payload.doc.id);
  }

  addC(link: Link) {
    if (link.count == undefined) {
      console.log("+1");
      link.count = 1;
      this.linkDoc.update(link);
      this.redirect(String(link.link));
    } else {
      console.log('só 1')
      link.count = Number(link.count) + 1;
      this.linkDoc.update(link);
      this.redirect(String(link.link));
    }

  }
  redirect(s: String) {
    //window.location.href="http://"+s;
    console.log("fim");
  }
}
