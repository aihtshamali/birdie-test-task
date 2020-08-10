import { Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Events {
    @PrimaryColumn()
    id: string | undefined   

    @Column("varchar")
    payload:string | undefined

    @Column("varchar")
    alert_id: string | undefined

    @Column("varchar")
    task_instance_id: string | undefined

    @Column("varchar")
    visit_id: string | undefined

    @Column("varchar")
    caregiver_id: string | undefined

    @Column("varchar")
    payload_as_text: string | undefined

    @Column("varchar")
    rejected_event_id: string | undefined

    @Column("varchar")
    observation_event_id: string | undefined

    @Column("varchar")
    timestamp: string | undefined


    @Column("varchar")
    event_type: string | undefined

    @Column("varchar")
    care_recipient_id: string | undefined


    

}
