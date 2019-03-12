import { Component,Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Link } from '../model/link';
import { Observable } from 'rxjs';
import { stringify } from '@angular/core/src/util';
import { async } from 'q';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  @Output() key :string;
  private linksCollection: AngularFirestoreCollection<Link>;
  private linkDoc: AngularFirestoreDocument<Link>;
  private link;
  private kid;
  private contador : number;
  private obLink : Observable<Link>;
  private tempLink : Link;
  constructor(private route: ActivatedRoute,public db:AngularFirestore) {
    this.contador=0;
    this.key = this.route.snapshot.params['id'];
    this.link = db.collection('links', ref => ref.where('shortLink', '==', this.key)).snapshotChanges();
   }

  ngOnInit() {
    this.link.subscribe((s)=>{
      if(s.length >0){
        s.forEach(element => {
          //window.location.href="http://"+element.link;
           this.setKid(element.payload.doc.id);
           this.linkDoc = this.db.doc<Link>("links/"+element.payload.doc.id);
           this.obLink = this.linkDoc.valueChanges();
        });  
        this.obLink.subscribe((snp)=>{
          var c = snp.count;
          this.updateCount(snp);  
          if(c){
            this.computar(c)
          }else{
            this.computar();
          }
          snp.count=this.contador

        })
      }
    })

  }
  setKid(s:string){  
     this.kid = s ;
  }
  getKid(){
    return this.kid;
  }
  computar(i?:number){
    if(i){
      this.contador = i+1;
    }else{
      this.contador =1;
    }
  }
  
  updateCount(link: Link){
    this.linkDoc.update(link);
   window.location.href="http://"+link.link;
  
  }
}
