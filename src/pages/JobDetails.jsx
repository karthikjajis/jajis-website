import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillAlt, FaClock } from "react-icons/fa";
import { API } from "../config/api";
import Seo from "../components/Seo";
import ApplyForm from "../components/ApplyForm";
import { btn, eyebrow } from "../components/ui";
import { EMPLOYMENT_LABEL, descriptionHtml, jobPostingLd, salaryText } from "../careers-data";

export default function JobDetails({ initialJob = null }) {
  const { id } = useParams();
  const [job, setJob] = useState(initialJob);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    let alive = true;
    API.get(`/jobs/${id}/`)
      .then((r) => alive && setJob(r.data))
      .catch((e) => alive && e?.response?.status === 404 && setClosed(true));
    return () => { alive = false; };
  }, [id]);

  const ld = useMemo(() => (job ? jobPostingLd(job) : null), [job]);

  if (closed) {
    return (
      <section className="pt-40 pb-24 px-6 text-center">
        <Seo title="Job closed" description="This job at Jaji's Innovation is no longer open." />
        <h1 className="text-3xl md:text-4xl">This job is no longer open</h1>
        <p className="mt-4 text-gray-600">See our other openings, or send us your CV.</p>
        <Link to="/careers" className={`${btn.solid} mt-8`}>All openings</Link>
      </section>
    );
  }
  if (!job) return <section className="pt-40 pb-24 px-6 max-w-3xl mx-auto animate-pulse"><div className="h-10 bg-gray-100" /><div className="mt-6 h-40 bg-gray-100" /></section>;

  const sal = salaryText(job);
  return (
    <div className="bg-white text-black pt-32 md:pt-40 pb-20">
      <Seo
        title={`${job.title} job in ${job.branch}`}
        description={`${job.title} — ${EMPLOYMENT_LABEL[job.employment_type] || ""} at Jaji's ${job.branch}, Kerala.${sal ? ` Salary ${sal}.` : ""} Apply online.`}
        jsonLd={ld}
      />
      <article className="max-w-3xl mx-auto px-6">
        <p className={eyebrow}><Link to="/careers" className="underline underline-offset-4">Careers</Link> / {job.branch}</p>
        <h1 className="text-3xl md:text-5xl mt-4">{job.title}</h1>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-gray-700">
          <span className="flex items-center gap-2"><FaMapMarkerAlt aria-hidden="true" />Jaji's {job.branch}, Kerala</span>
          <span className="flex items-center gap-2"><FaBriefcase aria-hidden="true" />{EMPLOYMENT_LABEL[job.employment_type] || job.employment_type}</span>
          {sal && <span className="flex items-center gap-2"><FaMoneyBillAlt aria-hidden="true" />{sal}</span>}
          {job.experience && <span className="flex items-center gap-2"><FaClock aria-hidden="true" />{job.experience}</span>}
        </div>
        <a href="#apply" className={`${btn.solid} mt-8`}>Apply now</a>

        <div className="mt-12 prose-job text-gray-800 leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1"
          dangerouslySetInnerHTML={{ __html: descriptionHtml(job.description) }} />

        <section id="apply" className="mt-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl">Apply for {job.title}</h2>
          <p className="mt-2 text-gray-600">It takes a minute. A CV helps, but isn't required.</p>
          <div className="mt-8"><ApplyForm jobId={job.id} jobTitle={job.title} /></div>
        </section>
      </article>
    </div>
  );
}
