import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Course } from '../../../../model/course.model';
import { CourseService } from '../../../services/course.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-course-detail',
    templateUrl: 'course-detail.html'
})
export class CourseDetailPage implements OnInit {
    course: Course = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private courseService: CourseService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.course = response.data;
        });
    }

    open(item: Course) {
        this.navController.navigateForward('/tabs/entities/course/' + item.id + '/edit');
    }

    async deleteModal(item: Course) {
        const alert = await this.alertController.create({
            header: 'Confirm the deletion?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.courseService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/course');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

}
