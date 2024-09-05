import React from 'react';
import PageTitle from "@/components/custom/page-title.tsx";
import SchedulePostForm from "@/features/schedule-post/components/schedule-post-form.tsx";


const SchedulePostPage: React.FC = () => {

    return (
        <div className="grow mt-8 mx-6">
            <PageTitle
                title='Agendar Postagem'
                subtitle='Agende uma postagem para ser feita nas redes sociais de sua escolha' />
            <SchedulePostForm />
        </div>
    );
};

export default SchedulePostPage;
